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

  // 最小化窗口
  ipcMain.on('minimize-window', () => {
    win.minimize()
  })

  // 创建配置文件窗口
  ipcMain.on('open-config-window', () => {
    if (win.isVisible()) {
      win.hide()
    }
    createConfigWindow()
  })

  // 默认浏览器打开链接
  ipcMain.on('open-link-in-browser', (_event: IpcMainEvent, url: string) => {
    shell.openExternal(url)
  })

  ipcMain.on('open-path', (_event: IpcMainEvent, path: string) => {
    shell.openPath(path)
  })
}
