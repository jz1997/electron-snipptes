import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { Result } from '../entites/common'
import categoryRepository from '../repositories/category-repository'
import { Category } from '../entites/category'

ipcMain.handle('find-all-category', (_event: IpcMainInvokeEvent, params: Map<string, any>) => {
  try {
    return categoryRepository.findAll(params)
  } catch (error) {
    console.log(error)
    return []
  }
})

ipcMain.handle('insert-category', (_event: IpcMainInvokeEvent, category: Category) => {
  try {
    const result = categoryRepository.insert(category)
    return result ? Result.success(category) : Result.fail('添加类型失败')
  } catch (error) {
    return Result.fail('操作失败')
  }
})

ipcMain.handle('update-category', (_event: IpcMainInvokeEvent, category: Category) => {
  try {
    const result = categoryRepository.update(category)
    return result ? Result.success(category) : Result.fail('更新类型失败')
  } catch (error) {
    console.log(error)
    return Result.fail('操作失败')
  }
})

ipcMain.handle('remove-category', (_event: IpcMainInvokeEvent, id: number | bigint) => {
  try {
    const result = categoryRepository.remove(id)
    return result ? Result.success(null) : Result.fail('删除类型失败')
  } catch (error) {
    return Result.fail('操作失败')
  }
})