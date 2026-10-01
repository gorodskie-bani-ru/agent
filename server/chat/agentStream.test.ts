import assert from 'node:assert/strict'
import test from 'node:test'
import { forwardAgentStream, type ChatChunk } from './agentStream'

function stream(
  text: string,
  splitBytes: boolean = false,
): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(text)
  return new ReadableStream({
    start(controller): void {
      if (splitBytes) {
        for (const byte of bytes) {
          controller.enqueue(Uint8Array.of(byte))
        }
      } else {
        controller.enqueue(bytes)
      }
      controller.close()
    },
  })
}

test('translates HTTP NDJSON across byte and UTF-8 boundaries', async () => {
  const chunks: ChatChunk[] = []
  await forwardAgentStream(
    stream(
      [
        '{"type":"started"}',
        '{"type":"progress","message":"Working"}',
        '{"type":"delta","text":"Привет 👋"}',
        '{"type":"delta","text":"!"}',
        '{"type":"done"}',
      ].join('\r\n'),
      true,
    ),
    async (chunk) => {
      chunks.push(chunk)
    },
  )
  assert.deepEqual(chunks, [
    { type: 'begin' },
    { type: 'item', content: 'Привет 👋' },
    { type: 'item', content: '!' },
    { type: 'end' },
  ])
})

test('rejects truncated, malformed, failed and oversized streams without success', async () => {
  for (const text of [
    '',
    '{"type":"started"}\n{"type":"delta","text":"partial"}\n',
    '{"type":"started"}\n{"type":"error"}\n',
    '{"type":"started"}\n{"type":"cancelled"}\n',
    '{"type":"started"}\ninvalid\n',
    '{"type":"delta","text":"before start"}\n',
    '{"type":"started"}\n{"type":"started"}\n',
    '{"type":"started"}\n{"type":"done"}\n{"type":"delta","text":"late"}\n',
    'x'.repeat(1024 * 1024 + 1),
  ]) {
    const chunks: ChatChunk[] = []
    await assert.rejects(
      forwardAgentStream(stream(text), async (chunk) => {
        chunks.push(chunk)
      }),
    )
    assert.equal(
      chunks.some((chunk) => chunk.type === 'end'),
      false,
    )
  }
})

test('consumer failure cancels upstream reading', async () => {
  let cancelled = false
  const body = new ReadableStream<Uint8Array>({
    start(controller): void {
      controller.enqueue(new TextEncoder().encode('{"type":"started"}\n'))
    },
    cancel(): void {
      cancelled = true
    },
  })
  await assert.rejects(
    forwardAgentStream(body, async () => {
      throw new Error('Disconnected')
    }),
  )
  assert.equal(cancelled, true)
})
