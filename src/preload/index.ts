import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { KeymapType } from '@main/manager/keymap'

// Custom APIs for renderer
const api = {
  hideWindow: () => {
    ipcRenderer.send('hide-window')
  },
  registerKeymap: (keymapType: KeymapType, keymap: string): Promise<boolean> => {
    return ipcRenderer.invoke('register-keymap', keymapType, keymap)
  },
  openConfigWindow: () => {
    ipcRenderer.send('open-config-window')
  },
  findAllCategory: (params?: Map<string, any>) => {
    return ipcRenderer.invoke('find-all-category', params ? params : new Map<string, any>())
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
