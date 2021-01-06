import { User } from './User'
import { FilterType } from './FilterType'

export interface Album {
  id: number
  title: string
  userId: number
}

export function getAlbumUser(users: User[], album: Album): User | undefined {
  return users.find(user => album.userId === user.id)
}

export function filterAlbumByTitle(albums: Album[], title: string): Album[] {
  const filteredAlbums = albums.filter(album => {
    return album.title.toLowerCase().indexOf(title) !== -1
  })

  return filteredAlbums
}

export function filterAlbumByUser(
  albums: Album[],
  users: User[],
  userName: string
): Album[] {
  const filteredAlbums = albums.filter(album => {
    const albumUser = getAlbumUser(users, album)
    if (!albumUser) {
      return false
    }
    return albumUser.name.toLowerCase().indexOf(userName) !== -1
  })

  return filteredAlbums
}

export function filterAlbumsByType(
  users: User[],
  albums: Album[],
  search: string,
  filterBy: FilterType
): Album[] {
  const defaultFilterMethod = filterAlbumByTitle

  const filteredAlbums =
    filterBy === 'album'
      ? filterAlbumByTitle(albums, search)
      : filterBy === 'user'
      ? filterAlbumByUser(albums, users, search)
      : defaultFilterMethod(albums, search)

  return filteredAlbums
}
