import { delay } from '../delay'

describe('delay', async () => {
  await test('delays 100ms', async () => {
    const ts = Date.now()
    await delay(100)
    const duration = Date.now() - ts

    expect(duration).greaterThan(100)
    expect(duration).lessThan(120)
  })
})
