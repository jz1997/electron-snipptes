import { BrowserWindow } from 'electron'
import { createWindow } from './window'

let configWindow: null | BrowserWindow = null
export const createConfigWindow = (): BrowserWindow => {
  if (!configWindow) configWindow = createWindow()

  configWindow.show()

  // 监听关闭事件
  configWindow.on('close', () => {
    configWindow = null
  })
  return configWindow
}
