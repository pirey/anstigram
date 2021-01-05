import { filterTypeFromString } from 'models'

describe('FilterType', () => {
  test('returns given string if it is valid filter type', () => {
    const album = 'album'
    const user = 'user'

    expect(filterTypeFromString(album)).toBe(album)
    expect(filterTypeFromString(user)).toBe(user)
  })

  test('returns album as default filter if given string is invalid', () => {
    expect(filterTypeFromString('invalid filter type')).toBe('album')
  })
})
