import { CommanderSetup } from '../../../_type_'
import { CommanderTag } from '../../utils/get-commander-tag'
import { resolveArgument } from '../../utils/resolve-argument'
import { resolveOption } from '../../utils/resolve-option'
import { Color } from '../formatters/colors'
import { CommanderDescription } from '../formatters/get-description'
import { getNameWithAlias } from '../formatters/get-name-with-alias'
import { getOptionNameWithAlias } from '../formatters/get-option-name-with-alias'

interface Args {
  addLine: (str: string) => void
  cmd: CommanderSetup
}

function addAvailableFeaturesDocumentation({ cmd, addLine: _ }: Args) {
  _('\n\nPROGRAMS\n')

  cmd.programs.forEach(p => {
    const programNameWithAlias = getNameWithAlias({
      name: p.name,
      alias: p.alias,
      color: Color.program,
    })

    _(`  ${programNameWithAlias} ${p.description}`)

    p.commands.forEach(c => {
      _('')

      const commandNameWithAlias = getNameWithAlias({
        name: c.name,
        alias: c.alias,
        color: Color.command,
      })

      _(`    ${commandNameWithAlias} ${c.description}`)

      c.arguments?.forEach(arg => {
        const argTag = CommanderTag.getArgumentTag(resolveArgument(arg))
        const argDesc = CommanderDescription.getArgumentDescription(arg)

        const argNameWithAlias = argTag
          .padEnd(30)
          .replace(argTag, Color.argument(argTag))

        _(`      ${argNameWithAlias} ${argDesc}`)
      })

      c.options?.forEach(opt => {
        const optNameWithAlias = getOptionNameWithAlias(resolveOption(opt))

        const type = Color.gray(`(${opt.type})`)

        _(`      ${optNameWithAlias} ${opt.description} ${type}`)

        const longestValue =
          opt.choices?.reduce<number>((longest, v) => {
            if (v.value.length > longest) longest = v.value.length
            return longest
          }, 0) ?? 0

        opt.choices?.forEach(val => {
          const rawValue = `"${val.value}"`
          const value = rawValue
            .padEnd(longestValue + 2)
            .replace(rawValue, Color.important(rawValue))

          _(`  ${' '.repeat(38)}${value}  ${val.name}`)
        })
      })
    })

    _('')
  })
}

export { addAvailableFeaturesDocumentation }
