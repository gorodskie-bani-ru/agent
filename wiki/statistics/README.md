# Site statistics

[Back to documentation](../README.md)

## Configuration

The app sends visitor events and chat events through `useStatistics` to the
`logStats` GraphQL mutation. Configure `AGENTS_CENTER_ENDPOINT` (the center's
GraphQL URL) and `AGENTS_CENTER_TOKEN` (this site's MessageRecipient token) in
`.env` for local development or `docker/.env` for Docker. These values stay on
the server. Restart the app after changing them. Without both values, the
mutation returns `null` and does not forward events.

## Server-to-server API

The server forwards each event to the center using
`createActivity(input: ActivityCreateInput!)`. The input contains `type` (the
local `eventId`), `status` (default `success`), and `data` (the complete event,
shared metadata, and `occurredAt`). Status uses the center's `ActivityStatus`
values: `pending`, `success`, and `failed`. The response is read from
`data.createActivity`. Authentication uses the MessageRecipient bearer token.

## Events

Chat events are `chat.message.sent`, `chat.message.received`, and
`chat.message.error`. They include the complete question, completed response or
error, and message/session identifiers. Cancelled and empty responses do not
produce a received event. Visitor events cover page views, identity changes,
scrolls and clicks.

## Event status

Each event in `logStats(data: { events: [...] })` may supply `status`:
`pending`, `success`, or `failed`. Omitting it defaults to `success`.
For example, `recordStatistics('chat.message.error', { status: 'failed', ... })`
records a failed event. Invalid statuses reject the whole batch before forwarding.

### Page views and SPA navigation

Page view events include `pageProps.statusCode` when present. Codes of 400 or
higher set `status: failed`; missing codes and codes below 400 use `success`.
This applies to the initial page and completed SPA/hash transitions. The hook
reads the committed page's status so an error does not carry over to the next
successful page.

## Limits and delivery

The API accepts JSON bodies up to 10 MB and statistics batches of up to 100
events. The browser sends up to 30 events per batch, splitting at roughly
48 KB without truncating text. Larger individual events use normal fetch
instead of keepalive. Delivery is best effort, with a queue capped at 100 events;
large requests are not guaranteed to finish when the page closes.

## Testing

Run the focused checks with:

```bash
npm test -- src/Custom/hooks/useStatistics src/components/Chat/ChatWidget/context/index.test.tsx
```
