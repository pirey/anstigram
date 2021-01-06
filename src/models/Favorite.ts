import { Album } from './Album'
import { Photo } from './Photo'

export interface FavoritePhoto extends Photo {
  albumId: number
  albumTitle: string
}

export function addPhotoToFavorites(
  favorites: FavoritePhoto[],
  photo: Photo,
  album: Album
): FavoritePhoto[] {
  const existing = favorites.find(favorite => photo.id === favorite.id)
  if (existing) {
    return favorites
  }

  const newFavorite = {
    ...photo,
    albumId: album.id,
    albumTitle: album.title,
  }

  return favorites.concat(newFavorite)
}

export function removePhotoFromFavorites(favorites: FavoritePhoto[], photo: Photo): FavoritePhoto[] {
  const newFavorites = favorites.filter(favorite => favorite.id !== photo.id)

  return newFavorites
}

export function getFavoriteByPhotoId(favorites: FavoritePhoto[], photoId: number): FavoritePhoto | null {
  const found = favorites.find(favorite => favorite.id === photoId)
  return found || null
}