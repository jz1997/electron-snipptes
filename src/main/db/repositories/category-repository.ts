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
  console.log(sql)
  const statement: Statement = db.prepare(sql)
  const rows = statement.all(values)
  return mapCategories(rows)
}

export default { findAll }
