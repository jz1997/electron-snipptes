import DoCommand from './do-command'

export default abstract class AbstractCommand<T, R> implements DoCommand<T, R> {
  private _name: string
  private _command: string
  private _description?: string

  constructor(name: string, command: string, description?: string) {
    this._name = name
    this._command = command
    this._description = description
  }
  abstract execute(params: T): Promise<R>

  public get name(): string {
    return this._name
  }
  public get command(): string {
    return this._command
  }
  public get description(): string | undefined {
    return this._description
  }

  public toJSON(): Record<string, any> {
    return {
      name: this._name,
      command: this._command,
      description: this._description
    }
  }
}
