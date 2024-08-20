import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron'
import { app, globalShortcut } from 'electron'
import KeymapManager, { KeymapType } from '../../manager/keymap'

// ipc 消息
const IPC_MSG_REGISTER_KEYMAP = 'register-keymap'

// 注册快捷键
export const registerKeymap = (win: BrowserWindow) => {
  // 注册显示隐藏快捷键
  // registertGlobalKeymap(win, KeymapType.SHOW_HIDE_WINDOW, KeymapManager.getOrDefault(KeymapType.SHOW_HIDE_WINDOW))

  // 绑定快捷键变更 IPC 消息
  registerKeymapIpc(win)

  app.on('will-quit', () => {
    // 取消全局快捷键注册
    globalShortcut.unregisterAll()
  })
}

// 注册显示隐藏快捷键
const registertGlobalKeymap = (
  win: BrowserWindow,
  keymapType: KeymapType,
  keymap: string
): boolean => {
  // 解除绑定
  const oldKeymap = KeymapManager.getOrDefault(keymapType)
  if (oldKeymap) {
    globalShortcut.unregister(oldKeymap)
  }

  if (globalShortcut.isRegistered(keymap)) {
    return false
  }

  // 设置新的快捷键
  KeymapManager.set(keymapType, keymap)

  // 注册快捷键
  return globalShortcut.register(keymap, () => {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  })
}

// 监听显示隐藏快捷键注册变更
const registerKeymapIpc = (win: BrowserWindow) => {
  ipcMain.handle(
    IPC_MSG_REGISTER_KEYMAP,
    (_event: IpcMainInvokeEvent, keymapType: KeymapType, keymap: string) => {
      // 重新绑定
      return registertGlobalKeymap(win, keymapType, keymap)
    }
  )
}
