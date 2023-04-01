import { CommanderSetup } from '../../../_type_'
import { Color } from '../formatters/colors'

interface Args {
  addLine: (str: string) => void
  cmd: CommanderSetup
}

function addCommonDocumentation({ cmd, addLine: _ }: Args) {
  _('\n---------------------------------------------------------------\n\n')
  _(Color.title(' DOCUMENTATION ') + '\n')

  _(`DETAILS\n`)

  _(`  ${Color.gray('Tool name:')}    ${cmd.name}`)
  _(`  ${Color.gray('Description:')}  ${cmd.description}`)
  _(`  ${Color.gray('Version:')}      ${cmd.version}`)

  _(`\nGLOSSARY\n`)
  _(`  ${Color.gray('program')}    ${Color.gray('Collection of scripts')} `)
  _(`  ${Color.gray('command')}    ${Color.gray('Single script')} `)
  _(
    `  ${Color.gray('argument')}   ${Color.gray(
      'Positional variable of the command',
    )} `,
  )
  _(`  ${' '.repeat(10)}   ${Color.gray('<>  required')} `)
  _(`  ${' '.repeat(10)}   ${Color.gray('[]  optional')} `)
  _(`  ${' '.repeat(10)}   ${Color.gray('... variadic')} `)

  _(`  ${Color.gray('option')}     ${Color.gray('Script flag/variable')} `)

  _('\nUSAGE\n')
  _(
    Color.important(
      `  $ ${cmd.name} ${Color.program('program')} ${Color.command(
        'command',
      )} ${Color.argument('<argument(s)...>')} ${Color.option('--option(s)')}`,
    ),
  )
  _('\n  EXAMPLE\n')

  _(
    Color.important(
      `    $ ${cmd.name} ${Color.program('math')} ${Color.command(
        'add-numbers',
      )} ${Color.argument('5 6 7')} ${Color.option('--display')}`,
    ),
  )
  _(
    Color.important(
      `    $ ${cmd.name} ${Color.program('m')} ${Color.command(
        'an',
      )} ${Color.argument('5 6 7')} ${Color.option('-d')}   ${Color.gray(
        'using aliases',
      )}`,
    ),
  )
  _(
    Color.important(
      `    $ ${cmd.name} ${Color.program('m')} ${Color.command(
        'add-numbers',
      )} ${Color.option('--help')}  ${Color.gray('get help')}`,
    ),
  )
}

export { addCommonDocumentation }
