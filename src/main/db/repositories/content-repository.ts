import { Content, mapContent, mapContents } from '../entites/content'
import { db } from '../../db/connect'
import { Statement } from 'better-sqlite3'
import { camelToSnakeCase } from '../../utils/utils'

// 查询全部
const findAll = (params: Map<string, any>): Content[] => {
  let sql = `select * from contents`
  const keys: string[] = Array.from(params.keys())
  const values: any[] = []
  if (keys.length > 0) {
    const condition: string[] = []
    for (let i = 0; i < keys.length; i++) {
      if (!params.get(keys[i])) {
        continue
      }
      if (keys[i] === 'title') {
        condition.push(`title like ('%' || ? || '%')`)
      } else {
        condition.push(`${camelToSnakeCase(keys[i])} = ?`)
      }

      values.push(params.get(keys[i]))
    }
    if (condition.length > 0) {
      sql += ` where ${condition.join(' and ')}`
    }
  }
  const statement: Statement = db.prepare(sql)
  const rows = statement.all(values)
  return mapContents(rows)
}

const findById = (id: number | bigint): Content => {
  const statement: Statement = db.prepare(`select * from contents where id = ?`)
  const row = statement.get(id)
  return mapContent(row)
}

// 添加内容
const insert = (content: Content): number | bigint => {
  const statement: Statement = db.prepare(
    `insert into contents (category_id, title, content) values (@categoryId, @title, @content)`
  )
  const info = statement.run(content)
  return info.lastInsertRowid
}

// 编辑内容
const update = (content: Content): number | bigint => {
  const statement: Statement = db.prepare(
    `update contents set category_id = @categoryId, title = @title, content = @content where id = @id`
  )
  const info = statement.run(content)
  return info.lastInsertRowid
}

// 删除内容
const remove = (id: number | bigint): boolean => {
  const statement: Statement = db.prepare(`delete from contents where id = ?`)
  const info = statement.run(id)
  return info.changes > 0
}

export default { findAll, findById, insert, update, remove }
