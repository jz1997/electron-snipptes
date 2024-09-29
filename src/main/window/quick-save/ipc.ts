import { BrowserWindow, ipcMain } from 'electron'

export const registerIpc = (win: BrowserWindow) => {
  // 关闭快保存窗口
  ipcMain.on('close-quick-save-window', () => {
    win.close()
  })
}
