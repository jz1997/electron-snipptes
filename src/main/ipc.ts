import { BrowserWindow, ipcMain, IpcMainEvent } from "electron"

// IPC test
ipcMain.on('ping', () => console.log('pong'))

ipcMain.on('set-ignore-mouse-events', (event: IpcMainEvent, ignore: boolean, options: { forward: boolean }) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.setIgnoreMouseEvents(ignore, options)
})

// 注册隐藏窗口事件
ipcMain.on('hide-window', (event: IpcMainEvent) => BrowserWindow.fromWebContents(event.sender)?.hide())
