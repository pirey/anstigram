export type FilterType = 'album' | 'user'

export function filterTypeFromString(s: string): FilterType {
  if (['album', 'user'].includes(s)) {
    return s as FilterType
  }

  return 'album'
}
