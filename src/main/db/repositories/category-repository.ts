import { Category, mapCategories, mapCategory } from '../entites/category'
import { db } from '../../db/connect'
import { Statement } from 'better-sqlite3'

// 查询全部
const findAll = (params: Map<string, any>): Category[] => {
  let sql = `select * from categories`
  const keys: string[] = Array.from(params.keys())
  const values: any[] = []
  if (keys.length > 0) {
    const condition: string[] = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'name') {
        condition.push(`name like ('%' || ? || '%')`)
      } else {
        condition.push(`${keys[i]} = ?`)
      }

      values.push(params.get(keys[i]))
    }

    sql += ` where ${condition.join(' and ')}`
  }
  const statement: Statement = db.prepare(sql)
  const rows = statement.all(values)
  return mapCategories(rows)
}

const findById = (id: number | bigint): Category | undefined => {
  const statement: Statement = db.prepare(`select * from categories where id = ?`)
  const row = statement.get(id)
  return row ? mapCategory(row) : undefined
}

// 根据分类名查询
const findByName = (name: string): Category | undefined => {
  const statement: Statement = db.prepare(`select * from categories where name = ? limit 1`)
  const row = statement.get(name)
  return row ? mapCategory(row) : undefined
}

// 添加分类
const insert = (category: Category): number | bigint => {
  const statement: Statement = db.prepare(`insert into categories (name) values (?)`)
  const info = statement.run(category.name)
  return info.lastInsertRowid
}

const update = (category: Category): number | bigint => {
  const statement: Statement = db.prepare(`update categories set name = ? where id = ?`)
  const info = statement.run(category.name, category.id)
  return info.lastInsertRowid
}

// 删除分类
const remove = (id: number | bigint): boolean => {
  const statement: Statement = db.prepare(`delete from categories where id = ?`)
  const info = statement.run(id)
  return info.changes > 0
}

export default { findAll, findById, findByName, insert, update, remove }
