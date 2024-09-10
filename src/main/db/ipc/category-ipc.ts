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

ipcMain.handle('find-category-by-id', (_event: IpcMainInvokeEvent, id: number | bigint) => {
  try {
    const category = categoryRepository.findById(id)
    return category ? Result.success(category) : Result.fail('未找到类型')
  } catch (error) {
    console.log(error)
    return Result.fail('操作失败')
  }
})

ipcMain.handle('find-category-by-name', (_event: IpcMainInvokeEvent, name: string) => {
  try {
    const category = categoryRepository.findByName(name)
    return category ? Result.success(category) : Result.fail('未找到类型')
  } catch (error) {
    console.log(error)
    return Result.fail('操作失败')
  }
})

ipcMain.handle('insert-category', (_event: IpcMainInvokeEvent, category: Category) => {
  try {
    const id = categoryRepository.insert(category)
    return Result.success(id)
  } catch (error) {
    return Result.fail('操作失败')
  }
})

ipcMain.handle('update-category', (_event: IpcMainInvokeEvent, category: Category) => {
  try {
    const id = categoryRepository.update(category)
    return Result.success(id)
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
