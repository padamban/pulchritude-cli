/* eslint-disable no-console */
interface Args {
  /**
   * Width of the banner.
   * - Minimum value: width of the base banner.
   */
  width: number
}

/**
 * Asci image displayed when we run the CLI.
 */
export const displayBanner = ({ width }: Args) => {
  let lines = [
    '                                                            ',
    '  ███╗   ██╗███████╗██╗    ██╗     █████╗ ██████╗ ██████╗   ',
    '  ████╗  ██║██╔════╝██║    ██║    ██╔══██╗██╔══██╗██╔══██╗  ',
    '  ██╔██╗ ██║█████╗  ██║ █╗ ██║    ███████║██████╔╝██████╔╝  ',
    '  ██║╚██╗██║██╔══╝  ██║███╗██║    ██╔══██║██╔═══╝ ██╔═══╝   ',
    '  ██║ ╚████║███████╗╚███╔███╔╝    ██║  ██║██║     ██║       ',
    '  ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝     ╚═╝  ╚═╝╚═╝     ╚═╝       ',
    '                                                            ',
  ]

  const minWidth = lines[0]?.length ?? 0

  const surplus = Math.max(width - minWidth, 0)

  const start = Math.floor(surplus / 2)
  const end = Math.ceil(surplus / 2)

  const fill = (length: number) => '░'.repeat(length)

  lines = lines.map(line => fill(start) + line + fill(end))

  console.log(lines.join('\n').replaceAll('░', ' '))
}
