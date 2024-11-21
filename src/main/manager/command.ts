import { EverythingParams, EverythingResponse, findFile } from '../api/everything'
import { Result } from '../db/entites/common'

export enum CommandType {
  FIND_FILE = 'findFile'
}

export class CommandManager {
  private static readonly COMMANDS: Map<string, AbstractCommand<any, any>> = new Map<
    string,
    AbstractCommand<string, any>
  >()
  constructor() {
    this.init()
  }

  private init() {
    CommandManager.COMMANDS.set(
      'findFile',
      new EveryThingFindFileCommand('查询文件', CommandType.FIND_FILE)
    )
  }

  public get(command: CommandType): AbstractCommand<any, any> {
    return CommandManager.COMMANDS.get(command.toString())!
  }
}

export interface DoCommand<T, R> {
  execute(params: T): Promise<R>
}

export abstract class AbstractCommand<T, R> implements DoCommand<T, R> {
  private name: string
  private command: string
  private description?: string

  constructor(name: string, command: string, description?: string) {
    this.name = name
    this.command = command
    this.description = description
  }
  abstract execute(params: T): Promise<R>

  get Name(): string {
    return this.name
  }
  get Command(): string {
    return this.command
  }
  get Description(): string | undefined {
    return this.description
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
