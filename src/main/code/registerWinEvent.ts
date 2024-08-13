import { BrowserWindow } from "electron"

export const registerWinEvent = (win: BrowserWindow) => {
    win.webContents.on("before-input-event", (event, input) => {
        if (input.type === "keyDown" && input.key === "Escape") {
            win.hide()
        }
    })
}