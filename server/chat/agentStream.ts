export interface ChatChunk {
  type: 'begin' | 'item' | 'end' | 'error'
  content?: string
  metadata?: { message: string }
}

// The upstream uses newline-delimited JSON over a streaming HTTP response.
export async function forwardAgentStream(
  body: ReadableStream<Uint8Array>,
  publish: (chunk: ChatChunk) => Promise<void>,
): Promise<void> {
  const reader = body.getReader()
  const decoder = new TextDecoder('utf-8', { fatal: true })
  let buffer = ''
  let started = false
  let completed = false

  const consume = async (line: string): Promise<void> => {
    if (!line.trim()) {
      return
    }
    if (line.length > 1024 * 1024 || completed) {
      throw new Error('Invalid agent stream')
    }
    const value: unknown = JSON.parse(line)
    if (typeof value !== 'object' || value === null || !('type' in value)) {
      throw new Error('Invalid agent event')
    }
    const event = value as Record<string, unknown>
    switch (event.type) {
      case 'started':
        if (started) {
          throw new Error('Duplicate agent start')
        }
        started = true
        await publish({ type: 'begin' })
        break
      case 'delta':
        if (!started || typeof event.text !== 'string') {
          throw new Error('Invalid agent delta')
        }
        await publish({ type: 'item', content: event.text })
        break
      case 'done':
        if (!started) {
          throw new Error('Missing agent start')
        }
        completed = true
        break
      case 'progress':
        if (!started) {
          throw new Error('Missing agent start')
        }
        break
      case 'error':
      case 'cancelled':
        throw new Error('Agent execution failed or was cancelled')
      default:
        throw new Error('Unknown agent event')
    }
  }

  try {
    for (;;) {
      const { done, value } = await reader.read()
      buffer += done
        ? decoder.decode()
        : decoder.decode(value, { stream: true })
      let newline: number
      while ((newline = buffer.indexOf('\n')) !== -1) {
        await consume(buffer.slice(0, newline))
        buffer = buffer.slice(newline + 1)
      }
      if (buffer.length > 1024 * 1024) {
        throw new Error('Agent frame too large')
      }
      if (done) {
        await consume(buffer)
        break
      }
    }
    if (!completed) {
      throw new Error('Agent stream ended before completion')
    }
    await publish({ type: 'end' })
  } finally {
    await reader.cancel().catch(() => undefined)
    reader.releaseLock()
  }
}
