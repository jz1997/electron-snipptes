import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { KeymapType } from '@main/manager/keymap'
import { Category } from '@main/db/entites/category'
import { Content } from '@main/db/entites/content'

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
  },
  findCategoryById: (id: number | bigint) => {
    return ipcRenderer.invoke('find-category-by-id', id)
  },
  insertCategory: (category: Category) => {
    return ipcRenderer.invoke('insert-category', category)
  },
  updateCategory: (category: Category) => {
    return ipcRenderer.invoke('update-category', category)
  },
  removeCategory: (id: number | bigint) => {
    return ipcRenderer.invoke('remove-category', id)
  },
  findAllContent: (params?: Map<string, any>) => {
    return ipcRenderer.invoke('find-all-content', params ? params : new Map<string, any>())
  },
  findContentById: (id: number | bigint) => {
    return ipcRenderer.invoke('find-content-by-id', id)
  },
  insertContent: (content: Content) => {
    return ipcRenderer.invoke('insert-content', content)
  },
  removeContent: (id: number | bigint) => {
    return ipcRenderer.invoke('remove-content', id)
  },
  updateContent: (content: Content) => {
    return ipcRenderer.invoke('update-content', content)
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
