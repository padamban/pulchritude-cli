/**
 * Template content and details that can help us in the selection.
 */
export interface TemplateDetails {
  /**
   * Name of the config template.
   */
  name: string

  /**
   * Config file extension.
   */
  extension: 'js' | 'ts'

  /**
   * Content of the file.
   */
  content: string
}
