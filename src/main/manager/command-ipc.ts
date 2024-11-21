import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { CommandManager, CommandType } from './command'

const commandManager: CommandManager = new CommandManager()

ipcMain.handle('do-command', (_event: IpcMainInvokeEvent, type: CommandType, params?: any) => {
  const command = commandManager.get(type)
  return command.execute(params)
})

