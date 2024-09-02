import moment from 'moment'

export function formatDate(date?: Date, format: string = 'YYYY-MM-DD'): string {
  if (date) {
    return moment(date).format(format)
  }
  return ''
}
