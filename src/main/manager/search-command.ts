import AbstractCommand from './abstract-command'
import { CommandManager } from './command'

export default class SearchCommand extends AbstractCommand<string, void> {
  constructor(name: string, command: string, description?: string) {
    super(name, command, description)
  }
  execute(params: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(params)}`
      CommandManager.shell.openExternal(url)
      resolve()
    })
  }
}
