import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { CommandManager, CommandType } from './command'

const commandManager: CommandManager = new CommandManager()

ipcMain.handle('do-command', (_event: IpcMainInvokeEvent, type: CommandType, params?: any) => {
  const command = commandManager.get(type)
  return command.execute(params)
})

ipcMain.handle('get-command-list', (_event: IpcMainInvokeEvent, name?: string) => {
  return commandManager
    .list()
    .filter((command) => command.command.includes((name || '').toUpperCase()))
    .map((command) => command.toJSON())
})
