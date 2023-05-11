import { TemplateDetails } from './_type_'
import { basicJsTemplate } from './basic.js.config'
import { basicTsTemplate } from './basic.ts.config'

/**
 * Different config templates of the CLI.
 */
export const TEMPLATES: TemplateDetails[] = [basicTsTemplate, basicJsTemplate]
