import { BrowserWindow, dialog } from "electron";
import { app, globalShortcut } from 'electron'

export const registerShortcut = (win: BrowserWindow) => {
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
}