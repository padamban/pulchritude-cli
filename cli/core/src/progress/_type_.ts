export interface CliProgress {
  /**
   * Divide the 100% into n sections.
   */
  setSectionCount: (count: number | undefined) => void

  /**
   * Divide the current section into m subsections.
   */
  setSubSectionCount: (count: number | undefined) => number

  /**
   * Displayed text next to the progress bar.
   */
  setSectionTitle: (title: string) => void

  /**
   * Jump to the next section.
   */
  nextActiveSection: () => void

  /**
   * Jump to the next subsection
   */
  nextActiveSubSection: (label?: string) => void

  /**
   * End the progress.
   */
  finish: () => void

  /**
   * Turn off the progress execution.
   */
  disable: () => void
}

export interface CliProgressArgs {
  /**
   * Character length of the progress bar.
   */
  barSize?: number

  /**
   * Number of space characters before the bar.
   */
  indent?: number
}
