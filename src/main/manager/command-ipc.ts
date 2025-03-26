import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { CommandManager, CommandType } from './command'

ipcMain.handle('do-command', (_event: IpcMainInvokeEvent, type: CommandType, params?: any) => {
  const command = CommandManager.get(type)
  return command.execute(params)
})

ipcMain.handle('get-command-list', (_event: IpcMainInvokeEvent, name?: string) => {
  return CommandManager.list()
    .filter((command) => command.command.includes((name || '').toUpperCase()))
    .map((command) => command.toJSON())
})

ipcMain.handle('get-command', (_event: IpcMainInvokeEvent, type?: CommandType) => {
  const findCommands = CommandManager.list()
    .filter((command) => command.command === type)
    .map((command) => command.toJSON())

    return findCommands.length > 0 ? findCommands[0] : null
})
