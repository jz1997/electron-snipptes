import { ElectronAPI } from '@electron-toolkit/preload'
import { KeymapType } from '@main/config/keymap'
import { Category } from '@main/db/entites/category'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      registerKeymap: (keymapType: KeymapType, keymap: string) => Promise<boolean>
      openConfigWindow: () => void
      findAllCategory: (params?: Map<string, any>) => Promise<Category[]>
    }
  }
}
