import { BrowserWindow } from 'electron'
import { createWindow } from './window'
import { registerIpc } from './ipc'

let quickSaveWindow: null | BrowserWindow = null

export const createQuickSaveWindow = (): BrowserWindow => {
  if (!quickSaveWindow) {
    quickSaveWindow = createWindow()
  }

  quickSaveWindow.show()
  registerIpc(quickSaveWindow)

  // 监听窗口关闭
  quickSaveWindow.on('close', () => {
    quickSaveWindow = null
  })

  return quickSaveWindow
}
