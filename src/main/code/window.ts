import { BrowserWindow, screen, shell } from "electron"
import icon from "../../../resources/icon.png?asset"
import * as ipc from "./ipc"
import { join } from "path"
import { is } from "@electron-toolkit/utils"

export function createWindow(): void {
    const { width } = screen.getPrimaryDisplay().workAreaSize
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 600,
      // height: 600,
      // x: width - 600,
      // y: 50,
      show: false,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
  
    // set transparent window ignore mouse event 
    // mainWindow.setIgnoreMouseEvents(true, { forward: true })
  
    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
    })
  
    // 注册 ipc 消息
    ipc.registerIpc(mainWindow)
    
    mainWindow.webContents.openDevTools()
    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }