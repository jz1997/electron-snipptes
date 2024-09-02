export interface Content {
  id: number | bigint
  categoryId: number | bigint
  title: string
  content: string
  createAt?: Date
}

export const mapContent = (row: any): Content => {
  return {
    id: row.id,
    categoryId: row.category_id,
    title: row.title,
    content: row.content,
    createAt: row.created_at
  } as Content
}

export const mapContents = (rows: any[]): Content[] => {
  return rows.map(mapContent)
}
