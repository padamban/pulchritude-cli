import { CliSetupDetails } from '../../../_type_'
import { Color } from '../../colors'

interface Args {
  addLine: (str: string) => void
  setup: CliSetupDetails
}

/**
 * Main documentation section.
 */
function addCommonDocumentation({ setup, addLine: _ }: Args) {
  _('\n\n' + Color.title(' DOCUMENTATION ') + '\n')

  _(`${Color.subtitle('DETAILS')}\n`)

  _(`  ${Color.gray('Tool name:')}    ${setup.name}`)
  _(`  ${Color.gray('Description:')}  ${setup.description}`)
  _(`  ${Color.gray('Version:')}      ${setup.version}`)

  _(`\n${Color.subtitle('GLOSSARY')}\n`)

  _(`  ${Color.gray('program')}      ${Color.gray('Collection of scripts')} `)
  _(`  ${Color.gray('command')}      ${Color.gray('Single script')} `)
  _(
    `  ${Color.gray('argument')}     ${Color.gray(
      'Positional variable of the command',
    )} `,
  )
  _(`  ${' '.repeat(10)}     ${Color.gray('<>  required')} `)
  _(`  ${' '.repeat(10)}     ${Color.gray('[]  optional')} `)
  _(`  ${' '.repeat(10)}     ${Color.gray('... variadic')} `)

  _(`  ${Color.gray('option')}       ${Color.gray('Script flag/variable')} `)
  _(
    `  ${Color.gray('multi run')}    ${Color.gray(
      'Can select multiple items in the prompt to run sequentially.',
    )} `,
  )

  _(`\n${Color.subtitle('USAGE')}\n`)

  _(
    Color.important(
      `  $ ${setup.name} ${Color.program('program')} ${Color.command(
        'command',
      )} ${Color.argument('<argument(s)...>')} ${Color.option('--option(s)')}`,
    ),
  )

  _('\n  EXAMPLE\n')

  _(
    Color.important(
      `    $ ${setup.name} ${Color.program('math')} ${Color.command(
        'add-numbers',
      )} ${Color.argument('5 6 7')} ${Color.option('--display')}`,
    ),
  )
  _(
    Color.important(
      `    $ ${setup.name} ${Color.program('m')} ${Color.command(
        'an',
      )} ${Color.argument('5 6 7')} ${Color.option(
        '-d',
      )}             ${Color.gray('using aliases')}`,
    ),
  )
  _(
    Color.important(
      `    $ ${setup.name} ${Color.program('m')} ${Color.command(
        'add-numbers',
      )} ${Color.option('--help')}      ${Color.gray('get help')}`,
    ),
  )
}

export { addCommonDocumentation }
