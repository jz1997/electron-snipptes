import { ipcMain, IpcMainInvokeEvent } from 'electron'
import categoryReposigory from './repositories/category-repository'

ipcMain.handle('find-all-category', (_event: IpcMainInvokeEvent, params: Map<string, any>) => {
  return categoryReposigory.findAll(params)
})
