import { ElectronAPI } from '@electron-toolkit/preload'
import { EverythingParams, EverythingResponse } from '@main/api/everything'
import { KeymapType } from '@main/config/keymap'
import { Category } from '@main/db/entites/category'
import { Content } from '@main/db/entites/content'
import { CommandType } from '@main/manager/Command'
import { Result } from 'electron'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      registerKeymap: (keymapType: KeymapType, keymap: string) => Promise<boolean>
      openConfigWindow: () => void
      findAllCategory: (params?: Map<string, any>) => Promise<Category[]>
      findCategoryById: (id: number | bigint) => Promise<Result<Category>>
      findCategoryByName: (name: string) => Promise<Result<Category>>
      insertCategory: (category: Category) => Promise<Result<number | bigint>>
      updateCategory: (category: Category) => Promise<Result<number | bigint>>
      removeCategory: (id: number | bigint) => Promise<Result<boolean>>
      findAllContent: (params?: Map<string, any>) => Promise<Result<Content[]>>
      findContentById: (id: number | bigint) => Promise<Result<Content>>
      insertContent: (content: Content) => Promise<Result<number | bigint>>
      updateContent: (content: Content) => Promise<Result<number | bigint>>
      removeContent: (id: number | bigint) => Promise<Result<boolean>>
      findFile: (
        params?: EverythingParams | Record<string, any>
      ) => Promise<Result<EverythingResponse>>
      doCommand: (type: CommandType, params?: any) => Promise<Result<any>>
      getCommand: (type?: CommandType) => AbstractCommand<any, any> | null
    }
  }
}
