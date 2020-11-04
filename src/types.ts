export interface CliConfig {
  name: string
  version: string
}

export interface MultiCommandCliConfig extends CliConfig {
  description?: string
  examples?: Array<string>
}

export type CommandConfig = {
  handler: CommandHandler
  description?: string
  examples?: Array<string>
  positionals?: Array<PositionalConfig>
  options?: Array<OptionConfig>
}

export type CommandHandler = (
  positionals: { [key: string]: unknown },
  options: { [key: string]: unknown },
  remainder: Array<string>
) => unknown

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
  | 'boolean'
  | 'number'
  | 'string'
  | Array<number>
  | Array<string>
  | ((value: string) => unknown)
