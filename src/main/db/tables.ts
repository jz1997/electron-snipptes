import { db } from './connect'

db.exec(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME NOT NULL default(datetime(CURRENT_TIMESTAMP,'localtime'))
)`)

db.exec(`CREATE TABLE IF NOT EXISTS contents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    default_open_type TEXT NULL,
    created_at DATETIME NOT NULL default(datetime(CURRENT_TIMESTAMP,'localtime'))
)`)
