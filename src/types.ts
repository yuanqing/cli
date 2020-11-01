export interface CliConfig {
  name: string
  version: string
}

export interface MultiCommandCliConfig extends CliConfig {
  description?: string
  examples?: Array<string>
}

export type CommandConfig = {
  description?: string
  examples?: Array<string>
  handler: CommandHandler
  options?: Array<OptionConfig>
  positionals?: Array<PositionalConfig>
}

export type CommandHandler = (
  positionals: { [key: string]: unknown },
  options: { [key: string]: unknown },
  remainder: Array<string>
) => unknown

export interface PositionalConfig {
  name: string
  default?: unknown
  description?: string
  required?: boolean
  type: Type
}

export interface OptionConfig extends PositionalConfig {
  shorthands?: Array<string>
}

export type Type =
  | 'boolean'
  | 'number'
  | 'string'
  | Array<number>
  | Array<string>
  | ((value: string) => null | unknown)
