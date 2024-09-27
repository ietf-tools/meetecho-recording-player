import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test'
import { describe, it, expect } from 'vitest'
import worker from '../src'

describe('Datatracker redirect test', () => {
  it('should redirect to DT with a 302 status', async () => {
    const request = new Request('http://example.org')
    const ctx = createExecutionContext()
    const response = await worker.fetch(request, env, ctx)

    await waitOnExecutionContext(ctx)

    expect(response.status).toBe(302)
    expect(response.headers.get('Location')).toBe('https://datatracker.ietf.org/meeting/past')
  })
})

describe('404 test', () => {
  it('should return 404 for /foobar', async () => {
    const request = new Request('http://example.org/foobar')
    const ctx = createExecutionContext()
    const response = await worker.fetch(request, env, ctx)

    await waitOnExecutionContext(ctx)

    expect(response.status).toBe(404)
  })
})
