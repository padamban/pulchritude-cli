import { delay } from '../delay'

await describe('delay', async () => {
  await test('delays 100ms (±10ms)', async () => {
    const ts = Date.now()
    await delay(100)
    const duration = Date.now() - ts

    expect(duration).greaterThan(90)
    expect(duration).lessThan(110)
  })
})
