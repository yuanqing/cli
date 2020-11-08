export interface CliConfig {
  name: string
  version: string
}

export interface MultiCommandCliConfig extends CliConfig {
  description?: string
  examples?: Array<string>
}

export type CommandConfig = {
  handler?: CommandHandler
  description?: string
  examples?: Array<string>
  positionals?: Array<PositionalConfig>
  options?: Array<OptionConfig>
  shorthands?: { [key: string]: Array<string> }
}

export type CommandHandler = (result: {
  positionals: { [key: string]: unknown }
  options: { [key: string]: unknown }
  remainder: Array<string>
}) => void

export interface PositionalConfig {
  name: string
  type: Type
  description?: string
  default?: unknown
  required?: boolean
}

export interface OptionConfig extends PositionalConfig {
  aliases?: Array<string>
}

export type Type =
  | 'BOOLEAN'
  | 'INTEGER'
  | 'POSITIVE_INTEGER'
  | 'NON_ZERO_POSITIVE_INTEGER'
  | 'NUMBER'
  | 'POSITIVE_NUMBER'
  | 'NON_ZERO_POSITIVE_NUMBER'
  | 'STRING'
  | ValueParser
  | Array<boolean | number | string | null>

export type ValueParser = (arg: string, name: string) => unknown

export type Result = {
  positionals: { [key: string]: unknown }
  options: { [key: string]: unknown }
  remainder: Array<string>
}
