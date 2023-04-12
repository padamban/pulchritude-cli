/**
 * Delay the a async execution.
 */
export const delay = (ms = 500): Promise<unknown> =>
  new Promise<void>(resolve => {
    setTimeout(() => resolve(), ms)
  })
