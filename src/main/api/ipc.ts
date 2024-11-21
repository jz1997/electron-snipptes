import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { EverythingParams, EverythingResponse, findFile } from './everything'
import { Result } from '../db/entites/common'

ipcMain.handle(
  'find-file',
  (_event: IpcMainInvokeEvent, params?: EverythingParams | Record<string, any>) => {
    return new Promise<Result<EverythingResponse>>((resolve, reject) => {
      findFile(params)
        .then((data: EverythingResponse) => {
          resolve(Result.success(data))
        })
        .catch((e) => {
          console.log(e)
          reject(Result.fail(e))
        })
    })
  }
)
