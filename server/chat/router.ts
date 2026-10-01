import { randomUUID } from 'node:crypto'
import { once } from 'node:events'
import express, { type ErrorRequestHandler, type Router } from 'express'
import { forwardAgentStream, type ChatChunk } from './agentStream'

export function createAgentChatRouter(target: string): Router {
  const url = new URL(target)
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('CHAT_AGENT_URL must be an HTTP or HTTPS endpoint')
  }
  const router = express.Router()
  router.post(
    '/webhook/agent-chat-webhook/chat',
    express.json({ limit: '256kb' }),
    async (req, res) => {
      res.setHeader('Cache-Control', 'no-store, no-transform')
      const body: unknown = req.body
      if (
        typeof body !== 'object' ||
        body === null ||
        !('chatInput' in body) ||
        typeof body.chatInput !== 'string' ||
        !body.chatInput.trim()
      ) {
        res.status(400).json({ error: 'Expected non-empty chatInput' })
        return
      }
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 120_000)
      timer.unref()
      const disconnect = (): void => {
        if (!res.writableEnded) {
          controller.abort()
        }
      }
      res.on('close', disconnect)
      const publish = async (chunk: ChatChunk): Promise<void> => {
        controller.signal.throwIfAborted()
        if (!res.write(`${JSON.stringify(chunk)}\n`)) {
          await once(res, 'drain', { signal: controller.signal })
        }
      }
      try {
        const upstream = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/x-ndjson',
          },
          body: JSON.stringify({
            stream: true,
            event: {
              type: 'message.received',
              id: randomUUID(),
              channelId: 'chat',
              message: { text: body.chatInput },
            },
          }),
          signal: controller.signal,
        })
        if (
          !upstream.ok ||
          !upstream.body ||
          !upstream.headers
            .get('content-type')
            ?.includes('application/x-ndjson')
        ) {
          await upstream.body?.cancel()
          throw new Error('Invalid agent response')
        }
        res.type('application/x-ndjson')
        await forwardAgentStream(upstream.body, publish)
        res.end()
      } catch {
        if (!res.destroyed && !res.writableEnded) {
          if (!res.headersSent) {
            res.status(502).json({ error: 'Agent request failed' })
          } else {
            res.end(
              `${JSON.stringify({ type: 'error', metadata: { message: 'Agent request failed' } })}\n`,
            )
          }
        }
      } finally {
        controller.abort()
        clearTimeout(timer)
        res.off('close', disconnect)
      }
    },
  )
  const invalidBody: ErrorRequestHandler = (
    error: unknown,
    _req,
    res,
    _next,
  ): void => {
    const tooLarge =
      typeof error === 'object' &&
      error !== null &&
      'type' in error &&
      error.type === 'entity.too.large'
    res.status(tooLarge ? 413 : 400).json({
      error: tooLarge ? 'Request body too large' : 'Invalid JSON body',
    })
  }
  router.use(invalidBody)
  return router
}
