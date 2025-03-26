import AbstractCommand from './abstract-command'
import SearchCommand from './search-command'
import EveryThingFindFileCommand from './everything-findfile-command'
import { Shell } from 'electron'
export enum CommandType {
  FIND_FILE = 'FIND_FILE',
  SEARCH = 'SEARCH'
}

export class CommandManager {
  private static readonly COMMANDS: Map<string, AbstractCommand<any, any>> = new Map<
    string,
    AbstractCommand<any, any>
  >()
  private static _shell: Shell

  static {
    this.init()
  }

  private static init() {
    CommandManager.COMMANDS.set(
      CommandType.FIND_FILE,
      new EveryThingFindFileCommand('查询文件', CommandType.FIND_FILE)
    )
    CommandManager.COMMANDS.set(
      CommandType.SEARCH,
      new SearchCommand('浏览器搜索', CommandType.SEARCH)
    )
  }

  public static get(command: CommandType): AbstractCommand<any, any> {
    return CommandManager.COMMANDS.get(command.toString())!
  }

  public static list(): Array<AbstractCommand<any, any>> {
    return Array.from(CommandManager.COMMANDS.values())
  }
  public static set shell(shell: Shell) {
    CommandManager._shell = shell
  }
  public static get shell() {
    return CommandManager._shell
  }
}
