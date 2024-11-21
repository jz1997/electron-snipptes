import { EverythingParams, EverythingResponse, findFile } from '../api/everything'
import { Result } from '../db/entites/common'

export enum CommandType {
  FIND_FILE = 'FIND_FILE'
}

export class CommandManager {
  private static readonly COMMANDS: Map<string, AbstractCommand<any, any>> = new Map<
    string,
    AbstractCommand<any, any>
  >()
  constructor() {
    this.init()
  }

  private init() {
    CommandManager.COMMANDS.set(
      CommandType.FIND_FILE,
      new EveryThingFindFileCommand('查询文件', CommandType.FIND_FILE)
    )
  }

  public get(command: CommandType): AbstractCommand<any, any> {
    return CommandManager.COMMANDS.get(command.toString())!
  }

  public list(): Array<AbstractCommand<any, any>> {
    return Array.from(CommandManager.COMMANDS.values())
  }
}

export interface DoCommand<T, R> {
  execute(params: T): Promise<R>
}

export abstract class AbstractCommand<T, R> implements DoCommand<T, R> {
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

export class EveryThingFindFileCommand extends AbstractCommand<
  EverythingParams,
  Result<EverythingResponse>
> {
  constructor(name: string, command: string, description?: string) {
    super(name, command, description)
  }
  execute(params: EverythingParams): Promise<Result<EverythingResponse>> {
    return new Promise<Result<any>>((resolve, reject) => {
      findFile(params)
        .then((data: EverythingResponse) => {
          resolve(Result.success(data))
        })
        .catch((e) => {
          console.log(e)
          reject(Result.fail(e.message))
        })
    })
  }
}
