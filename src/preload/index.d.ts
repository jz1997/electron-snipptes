import { ElectronAPI } from '@electron-toolkit/preload'
import { KeymapType } from '@main/config/keymap'

declare global {
  interface Window {
    electron: ElectronAPI
    api: { 
      hideWindow: () => void,
      registerKeymap: (keymapType: KeymapType, keymap: string) => void,
    }
  }
}
