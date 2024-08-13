import { app } from 'electron';
import { createWindow } from './window';
import { registerIpc } from "./ipc"
import { registerShortcut } from './shortcut';
import { registerWinEvent } from './registerWinEvent';

app.whenReady().then(() => {
    const mainWindow = createWindow()

    // 注册 ipc 消息
    registerIpc(mainWindow)

    // 注册快捷键
    registerShortcut(mainWindow)

    // 注册mainwindow 事件
    registerWinEvent(mainWindow)
})