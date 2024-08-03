import { BrowserWindow, ipcMain, IpcMainEvent } from "electron"

export const registerIpc = (win: BrowserWindow) => {
    // 注册鼠标穿透事件
    ipcMain.on('set-ignore-mouse-events', (event: IpcMainEvent, ignore: boolean, options: { forward: boolean }) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win?.setIgnoreMouseEvents(ignore, options)
    })
    
    
    // 注册隐藏窗口事件
    ipcMain.on('hide-window', () => {
        win.hide()
    })
    
}


// ipcMain.on('set-ignore-mouse-events', (event: IpcMainEvent, ignore: boolean, options: { forward: boolean }) => {
//     const win = BrowserWindow.fromWebContents(event.sender)
//     win?.setIgnoreMouseEvents(ignore, options)
// })

// // 注册隐藏窗口事件
// ipcMain.on('hide-window', (event: IpcMainEvent) => BrowserWindow.fromWebContents(event.sender)?.hide())
