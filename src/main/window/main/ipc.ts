import { BrowserWindow, ipcMain, IpcMainEvent, shell } from 'electron'
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

  // 默认浏览器打开链接
  ipcMain.on('open-link-in-browser', (event: IpcMainEvent, url: string) => {
    shell.openExternal(url)
  })
}

// ipcMain.on('set-ignore-mouse-events', (event: IpcMainEvent, ignore: boolean, options: { forward: boolean }) => {
//     const win = BrowserWindow.fromWebContents(event.sender)
//     win?.setIgnoreMouseEvents(ignore, options)
// })

// // 注册隐藏窗口事件
// ipcMain.on('hide-window', (event: IpcMainEvent) => BrowserWindow.fromWebContents(event.sender)?.hide())
