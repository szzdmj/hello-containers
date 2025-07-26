import { Hono } from 'hono'
import { handle } from '@cloudflare/containers'

const app = new Hono()

// Optional: add API or special routes here
app.get('/health', (c) => c.text('OK'))

// Proxy all unmatched requests to the container
app.all('*', async (c) => {
  return await handle(c, {
    container: 'shenzhou-app',
    forward: true
  })
})

export default app
