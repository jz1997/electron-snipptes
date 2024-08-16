import { BrowserWindow, dialog, Event, Input } from "electron";
import { app, globalShortcut } from 'electron'

export const registerShortcut = (win: BrowserWindow) => {
    // 注册全局快捷键
    const ret = globalShortcut.register('CommandOrControl+Shift+.', () => {
        win.show();
    })

    if (!ret) {
        dialog.showErrorBox('错误提示', "全局快捷键注册失败");
        return;
    }

    app.on('will-quit', () => {
        // Unregister all shortcuts.
        globalShortcut.unregisterAll()
    })

    // 监听快捷键事件
    win.webContents.on('before-input-event', (event: Event, input: Input) => {
        if (input.type === "KeyDown" && input.key === 'Escape') {
            win.hide()
        }
    })
}