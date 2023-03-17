import chalk from 'chalk'
import cliProgress from 'cli-progress'

import { CliProgress, CliProgressArgs } from './_type_'

/**
 * Creates a progress bar renderer.
 * - a progress bar can be split into sections
 *   - we can jump to the next section, and the bar fills in fractionally
 *   - we can display a section info next to the bar
 * - we can divide the current sections into subsections
 *   - we can jump to the next subsection, and the bar fills in fractionally
 */
export const PROGRESS = (args?: CliProgressArgs): CliProgress => {
  const { barSize = 50, indent = 0 } = args ?? {}

  let sectionCount = 0
  let subSectionCount = 0
  let currentSectionIdx = 0
  let currentSubSectionIdx = 0
  let currentSectionTitle = ''
  let currentSectionLabel = ''
  let progressBar: cliProgress.SingleBar
  let finished = false
  let disabled = false

  const initProgressBar = () => {
    if (disabled) return

    progressBar = new cliProgress.SingleBar(
      {
        hideCursor: true,
        barsize: barSize,
        format: ' '.repeat(indent) + '{bar}' + chalk.yellow(' {pc} {title}'),
      },
      cliProgress.Presets.shades_classic,
    )
    progressBar?.start(100, 0, { pc: '', title: '' })
  }

  const render = () => {
    if (disabled) return

    const sectionPC = currentSectionIdx / sectionCount
    const subSectionPC = currentSubSectionIdx / subSectionCount
    const subSectionSize = 100 / sectionCount
    const PC = +(sectionPC * 100 + subSectionSize * subSectionPC || 0).toFixed(
      0,
    )

    if (finished) {
      progressBar.update(100, { pc: '', title: '' })
    } else {
      progressBar?.update(PC, {
        pc: `${PC}%`.padStart(4),
        title:
          PC === 100
            ? ''
            : '| ' +
              currentSectionTitle +
              (currentSectionLabel ? ' - ' + currentSectionLabel : ''),
      })
    }
  }

  return {
    setSectionCount: (count: number | undefined) => {
      initProgressBar()
      sectionCount = count || 1
    },
    setSubSectionCount: (count: number | undefined) =>
      (subSectionCount = count || 1),
    setSectionTitle: (title: string) => {
      currentSectionTitle = title
      render()
    },
    nextActiveSubSection: (label?: string) => {
      currentSectionLabel = label ?? ''
      if (subSectionCount > currentSubSectionIdx) {
        currentSubSectionIdx++
      }
      render()
    },
    nextActiveSection: () => {
      currentSectionIdx++
      currentSectionTitle = ''
      currentSectionLabel = ''
      currentSubSectionIdx = 0
      subSectionCount = 1
      render()
    },
    finish: () => {
      finished = true
      render()
    },
    disable: () => {
      finished = true
      disabled = true
    },
  }
}

export type Progress = ReturnType<typeof PROGRESS>
