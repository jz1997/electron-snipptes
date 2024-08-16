import { app } from 'electron';
import { createWindow } from './window';
import { registerIpc } from "./ipc"
import { registerShortcut } from './shortcut';

app.whenReady().then(() => {
    const mainWindow = createWindow()

    // 注册 ipc 消息
    registerIpc(mainWindow)

    // 注册快捷键
    registerShortcut(mainWindow)
})