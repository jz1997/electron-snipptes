import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Result } from '../entites/common'
import contentRepository from '../repositories/content-repository'
import { Content } from '../entites/content'
import categoryRepository from '../repositories/category-repository'

ipcMain.handle('find-all-content', (_event: IpcMainInvokeEvent, params: Map<string, any>) => {
  try {
    const contents = contentRepository.findAll(params).map((c) => fillCategory(c))
    return Result.success(contents)
  } catch (error) {
    console.log(error)
    return []
  }
})

ipcMain.handle('find-content-by-id', (_event: IpcMainInvokeEvent, id: number | bigint) => {
  const content = contentRepository.findById(id)
  return Result.success(content)
})

ipcMain.handle('insert-content', (_event: IpcMainInvokeEvent, content: any) => {
  try {
    const result = contentRepository.insert(content)
    return Result.success(result)
  } catch (error) {
    console.log(error)
    return Result.fail('操作失败')
  }
})

ipcMain.handle('update-content', (_event: IpcMainInvokeEvent, content: Content) => {
  try {
    const result = contentRepository.update(content)
    return Result.success(result)
  } catch (error) {
    console.log(error)
    return Result.fail('操作失败')
  }
})

ipcMain.handle('remove-content', (_event: IpcMainInvokeEvent, id: number | bigint) => {
  try {
    const result = contentRepository.remove(id)
    return result ? Result.success(null) : Result.fail('删除内容失败')
  } catch (error) {
    return Result.fail('操作失败')
  }
})

const fillCategory = (content: Content): Content => {
  if (content.categoryId) {
    const category = categoryRepository.findById(content.categoryId)
    content.category = category
  }

  return content
}
