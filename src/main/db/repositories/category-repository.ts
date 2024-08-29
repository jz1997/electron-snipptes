import { Category, mapCategories } from '../entites/category'
import { db } from '../../db/connect'
import { Statement } from 'better-sqlite3'

// 查询全部
const findAll = (params: Map<string, any>): Category[] => {
  let sql = `select * from categories`
  let keys: string[] = Array.from(params.keys())
  let values: any[] = []
  if (keys.length > 0) {
    let condition: string[] = []
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

// 添加分类
const insert = (category: Category): boolean => {
  const statement: Statement = db.prepare(`insert into categories (name) values (?)`)
  const info = statement.run(category.name)
  return info.changes > 0
}

const update = (category: Category): boolean => {
  const statement: Statement = db.prepare(`update categories set name = ? where id = ?`)
  const info = statement.run(category.name, category.id)
  return info.changes > 0
}

// 删除分类
const remove = (id: number | bigint): boolean => {
  const statement: Statement = db.prepare(`delete from categories where id = ?`)
  const info = statement.run(id)
  return info.changes > 0
}

export default { findAll, insert, update, remove }
