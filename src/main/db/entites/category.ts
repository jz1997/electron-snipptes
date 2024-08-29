export interface Category {
  id: number | bigint
  name: string
  createAt?: Date
}

export const mapCategory = (row: any): Category => {
  return {
    id: row.id,
    name: row.name,
    createAt: row.create_at
  }
}

export const mapCategories = (rows: any[]): Category[] => {
  return rows.map(mapCategory)
}
