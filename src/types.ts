export type CliConfig = {
  name: string
  version: string
  description?: string
}

export type CommandConfig = {
  positionals?: Array<PositionalConfig>
  options?: Array<OptionConfig>
  handler: (
    positionals: { [key: string]: unknown },
    options: { [key: string]: unknown },
    remainder: Array<string>
  ) => unknown
  examples?: Array<string>
}

export interface PositionalConfig {
  name: string
  description: string
  type: Type
  required?: boolean
  default?: unknown
}

export interface OptionConfig extends PositionalConfig {
  shorthands?: Array<string>
}

export type Type =
  | 'boolean'
  | 'number'
  | 'string'
  | Array<string>
  | ((value: string) => null | unknown)
