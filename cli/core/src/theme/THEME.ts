import { DeepPartial } from '../utils'
import { CliTheme } from './_type_'
import { DEFAULT_COLORS } from './colors'

type ThemeOverride = (defaultTheme: CliTheme) => DeepPartial<CliTheme>

const DEFAULT_THEME: CliTheme = { color: DEFAULT_COLORS }

function THEME(override?: ThemeOverride): CliTheme {
  const overriddenTheme = override?.(DEFAULT_THEME) ?? DEFAULT_THEME
  return {
    color: {
      ...DEFAULT_THEME.color,
      ...overriddenTheme.color,
    },
  }
}

export { THEME }
