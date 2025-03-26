import { EverythingParams, EverythingResponse, findFile } from '../api/everything'
import { Result } from '../db/entites/common'
import AbstractCommand from './abstract-command'

export default class EveryThingFindFileCommand extends AbstractCommand<
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
