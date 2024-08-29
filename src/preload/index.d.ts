import { ElectronAPI } from '@electron-toolkit/preload'
import { KeymapType } from '@main/config/keymap'
import { Category } from '@main/db/entites/category'
import { Content } from '@main/db/entites/content'
import { Result } from 'electron'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      registerKeymap: (keymapType: KeymapType, keymap: string) => Promise<boolean>
      openConfigWindow: () => void
      findAllCategory: (params?: Map<string, any>) => Promise<Category[]>
      insertCategory: (category: Category) => Promise<Result<boolean>>
      updateCategory: (category: Category) => Promise<Result<boolean>>
      removeCategory: (id: number | bigint) => Promise<Result<boolean>>
      findAllContent: (params?: Map<string, any>) => Promise<Result<Content[]>>
      findContentById: (id: number | bigint) => Promise<Result<Content>>
      insertContent: (content: Content) => Promise<Result<boolean>>
      removeContent: (id: number | bigint) => Promise<Result<boolean>>
      updateContent: (content: Content) => Promise<Result<boolean>>
    }
  }
}
