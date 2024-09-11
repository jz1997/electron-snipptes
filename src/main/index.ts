import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './window/main/window'
import './window/main/index'
import './db'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.commandLine.appendSwitch("wm-window-animations-disabled")

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') {
    app.quit()
  }
})
