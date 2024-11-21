import request from '../utils/request'

export interface EverythingFile {
  type?: string
  name?: string
  path?: string
  size?: number
  date_modified?: number
}

export type EverythingResults = Array<EverythingFile>

export interface EverythingResponse {
  totalResults: number
  results: EverythingResults
}

export interface EverythingParams {
  s?: string
  o?: number
  c?: number
  j?: number
  i?: number
  w?: number
  p?: number
  r?: number
  m?: number
  path_column?: number
  size_column?: number
  date_modified_column?: number
  date_created_column?: number
  attributes_column?: number
  sort?: string
  ascending?: number
}

const defaultParams: EverythingParams = {
  s: '鄂尔多斯',
  o: 0,
  c: 32,
  j: 1,
  i: 0,
  w: 0,
  p: 0,
  r: 0,
  m: 0,
  path_column: 1,
  size_column: 1,
  date_modified_column: 1,
  date_created_column: 1,
  attributes_column: 1,
  sort: 'name',
  ascending: 1
}

export function findFile(
  params?: EverythingParams | Record<string, any>
): Promise<EverythingResponse> {
  return request({
    url: "/",
    params: {
      ...defaultParams,
      ...(params || {})
    }
  })
}
