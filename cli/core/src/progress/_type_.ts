/**
 * ASCII progress bar.
 */
export interface ProgressBar {
  /**
   * Divide the 100% into n sections.
   */
  setSectionCount: (count: number | undefined) => void

  /**
   * Displayed text next to the progress bar.
   */
  setSectionTitle: (title: string) => void

  /**
   * Jump to the next section.
   */
  nextActiveSection: () => void

  /**
   * Control a segment of the section.
   * - e.g.:
   * We run 3 scripts, the progress bar is divided into 3 equal length segments.
   * With these utilities we can divide the current segment into smaller portions.
   */
  sub: SubProgressBar

  /**
   * End the progress.
   */
  finish: () => void

  /**
   * Turn off the progress execution.
   */
  disable: () => void
}

/**
 * Arguments of the cli progress bar.
 */
export interface ProgressBarArgs {
  /**
   * Character length of the progress bar.
   */
  barSize?: number

  /**
   * Number of space characters before the bar.
   */
  indent?: number
}

/**
 * Manage the division of the progress bar sections into smaller sub-sections.
 */
export interface SubProgressBar {
  /**
   * Jump to the next subsection, and also set the label of the next section.
   */
  nextActiveSection: (label?: string) => void

  /**
   * Divide the current section into m subsections.
   */
  setSectionCount: (count: number | undefined) => number

  /**
   * Displayed text next to the progress bar,
   * by default it is the name of the current command.
   */
  setSectionTitle: (title: string) => void

  /**
   * Displayed text next to the progress bar,
   * by default it is the name of the current command.
   */
  setSectionLabel: (label: string) => void
}
