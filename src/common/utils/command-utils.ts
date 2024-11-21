import { CommandType } from '../../main/manager/command'
export function parseCommand(value: string): CommandType | undefined {
  const commands = value.split(' ')
  if (commands.length < 1) {
    return undefined
  }
  const commandType = getCommandType(commands[0])
  return commandType
}

export function getCommandType(value: string): CommandType | undefined {
  const entries = Object.entries(CommandType).filter((entry) => {
    console.log(entry[0] === value.toUpperCase())
    if (CommandType[entry[0]] === value.toUpperCase()) {
      return true
    }
    return false
  })
  if (entries.length > 0) {
    return entries[0][1]
  }
  return undefined
}
