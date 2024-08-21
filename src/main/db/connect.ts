import Database, * as BetterSqlite3 from 'better-sqlite3'
import { app } from 'electron'
import { resolve } from 'path'
const dbFileName = resolve(app.getPath('home'), '.config', 'snippets.db')
const db: BetterSqlite3.Database = new Database(dbFileName, {})
db.pragma('journal_mode = WAL')

export { db }
