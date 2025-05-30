import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
// @ts-ignore
import icon from '../../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import url from 'node:url'

// 创建 window
export function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    // x: width - 600,
    // y: 50,
    center: true,
    show: false,
    // frame: false,
    // transparent: true,
    // alwaysOnTop: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // dev 环境开启调试工具
  if (is.dev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/quick-save')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true,
        hash: 'quick-save'
      })
    )
  }

  return mainWindow
}
