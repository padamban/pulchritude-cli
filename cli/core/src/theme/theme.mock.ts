import chalk from 'chalk'

import { THEME } from './THEME'

const MOCK_THEME = THEME(() => ({
  color: { error: chalk, warning: chalk, option: chalk, success: chalk },
}))

export { MOCK_THEME }
