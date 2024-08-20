import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import { createConfigWindow } from '../config/index'

export const registerIpc = (win: BrowserWindow) => {
  // 注册鼠标穿透事件
  ipcMain.on(
    'set-ignore-mouse-events',
    (event: IpcMainEvent, ignore: boolean, options: { forward: boolean }) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      win?.setIgnoreMouseEvents(ignore, options)
    }
  )

  // 注册隐藏窗口事件
  ipcMain.on('hide-window', () => {
    win.hide()
  })

  // 创建配置文件窗口
  ipcMain.on('open-config-window', () => {
    createConfigWindow()
  })
}

// ipcMain.on('set-ignore-mouse-events', (event: IpcMainEvent, ignore: boolean, options: { forward: boolean }) => {
//     const win = BrowserWindow.fromWebContents(event.sender)
//     win?.setIgnoreMouseEvents(ignore, options)
// })

// // 注册隐藏窗口事件
// ipcMain.on('hide-window', (event: IpcMainEvent) => BrowserWindow.fromWebContents(event.sender)?.hide())
