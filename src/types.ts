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
  shorthands?: { [key: string]: Array<string> }
}

export type CommandHandler = (
  positionals: { [key: string]: unknown },
  options: { [key: string]: unknown },
  remainder: Array<string>
) => unknown

export interface PositionalConfig {
  name: string
  type: ArgType
  description?: string
  default?: unknown
  required?: boolean
}

export interface OptionConfig extends PositionalConfig {
  aliases?: Array<string>
}

export type ArgType =
  | string
  | Array<boolean | number | string | null>
  | ((arg: string, name: string) => unknown)
