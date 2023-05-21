import chalk from 'chalk'

import { DEFAULT_COLORS } from '../colors'
import { THEME } from '../THEME'

describe('theme', () => {
  test('default color values', () => {
    expect(THEME().color).toMatchObject(DEFAULT_COLORS)
  })

  test('override color values', () => {
    expect(
      THEME(() => ({ color: { error: chalk.magenta } })).color,
    ).toMatchObject({ ...DEFAULT_COLORS, error: chalk.magenta })
  })
})
