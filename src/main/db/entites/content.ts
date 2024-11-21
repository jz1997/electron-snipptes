import { Category } from './category'

export enum ContentType {
  URL = 'url',
  FILE = 'file',
  FOLDER = 'folder',
  UNKNOWN = 'unknown'
}

export function parseContentType(type?: string): ContentType {
  const matchEntries = Object.entries(ContentType).filter((entry) => {
    return ContentType[entry[0]] === type
  })
  if (matchEntries.length > 0) {
    return matchEntries[0][1]
  }
  return ContentType.UNKNOWN
}

export interface Content {
  id?: number | bigint
  categoryId?: number | bigint
  title?: string
  content?: string
  defaultOpenType?: string
  createAt?: Date

  // extra properties begin
  category?: Category
  type?: ContentType
}

export enum ContentOpenType {
  OPEN_WITH_BRAWSER = 'OPEN_WITH_BRAWSER',
  COPY_TO_CLIPBOARD = 'COPY_TO_CLIPBOARD'
}

export const mapContent = (row: any): Content => {
  return {
    id: row.id,
    categoryId: row.category_id,
    title: row.title,
    content: row.content,
    defaultOpenType: row.default_open_type,
    createAt: row.created_at
  } as Content
}

export const mapContents = (rows: any[]): Content[] => {
  return rows.map(mapContent)
}
