import { CliTheme } from '../../../../theme'
import { CliSetupDetails } from '../../../_type_'

interface Args {
  addLine: (str: string) => void
  setup: CliSetupDetails
  theme: CliTheme
}

/**
 * Main documentation section.
 */
function addCommonDocumentation(args: Args) {
  const { setup, addLine: _, theme } = args
  const { color } = theme

  _('\n\n' + color.title(' DOCUMENTATION ') + '\n')

  _(`${color.subtitle('DETAILS')}\n`)

  _(`  ${color.gray('Tool name:')}    ${setup.name}`)
  _(`  ${color.gray('Description:')}  ${setup.description}`)
  _(`  ${color.gray('Version:')}      ${setup.version}`)

  _(`\n${color.subtitle('GLOSSARY')}\n`)

  _(`  ${color.gray('program')}      ${color.gray('Collection of scripts')} `)
  _(`  ${color.gray('command')}      ${color.gray('Single script')} `)
  _(
    `  ${color.gray('argument')}     ${color.gray(
      'Positional variable of the command',
    )} `,
  )
  _(`  ${' '.repeat(10)}     ${color.gray('<>  required')} `)
  _(`  ${' '.repeat(10)}     ${color.gray('[]  optional')} `)
  _(`  ${' '.repeat(10)}     ${color.gray('... variadic')} `)

  _(`  ${color.gray('option')}       ${color.gray('Script flag/variable')} `)
  _(
    `  ${color.gray('multi run')}    ${color.gray(
      'Can select multiple items in the prompt to run sequentially.',
    )} `,
  )

  _(`\n${color.subtitle('USAGE')}\n`)

  _(
    color.important(
      `  $ ${setup.name} ${color.program('program')} ${color.command(
        'command',
      )} ${color.argument('<argument(s)...>')} ${color.option('--option(s)')}`,
    ),
  )

  _('\n  EXAMPLE\n')

  _(
    color.important(
      `    $ ${setup.name} ${color.program('math')} ${color.command(
        'add-numbers',
      )} ${color.argument('5 6 7')} ${color.option('--display')}`,
    ),
  )
  _(
    color.important(
      `    $ ${setup.name} ${color.program('m')} ${color.command(
        'an',
      )} ${color.argument('5 6 7')} ${color.option(
        '-d',
      )}             ${color.gray('using aliases')}`,
    ),
  )
  _(
    color.important(
      `    $ ${setup.name} ${color.program('m')} ${color.command(
        'add-numbers',
      )} ${color.option('--help')}      ${color.gray('get help')}`,
    ),
  )
}

export { addCommonDocumentation }
