import chalk from 'chalk'

import { CliColor, COLOR_NAMES } from './_type_'
import { THEME } from './THEME'

const MOCK_THEME = THEME(() => ({
  color: COLOR_NAMES.reduce<CliColor>((acc, name) => {
    acc[name] = chalk
    return acc
  }, {} as any),
}))

export { MOCK_THEME }
