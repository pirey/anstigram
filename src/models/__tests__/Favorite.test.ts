import { Photo } from 'models'
import { photos as photosMock, albums as albumsMock } from 'mocks'
import {
  addPhotoToFavorites,
  removePhotoFromFavorites,
  getFavoriteByPhotoId,
  toggleFavoritePhoto
} from 'models'
import { FavoritePhoto } from 'models/Favorite'

const firstAlbum = albumsMock[0]
const albumPhotos = photosMock.filter(
  (photo: Photo) => photo.albumId === firstAlbum.id
)
const firstAlbumPhoto = albumPhotos[0]
const secondAlbumPhoto = albumPhotos[1]
const thirdAlbumPhoto = albumPhotos[2]

describe('favorite photo manager', () => {
  describe('add photo to favorite', () => {
    test('first time add favorite photo', () => {
      const favorites: FavoritePhoto[] = []
      const newFavorites = addPhotoToFavorites(
        favorites,
        firstAlbumPhoto,
        firstAlbum
      )

      expect(newFavorites).toHaveLength(1)
      expect(newFavorites[0].id).toBe(firstAlbumPhoto.id)
      expect(newFavorites[0].albumId).toBe(firstAlbum.id)
      expect(newFavorites[0].albumTitle).toBe(firstAlbum.title)
    })

    test('should not be added if photo already in favorite', () => {
      const favorites = addPhotoToFavorites([], firstAlbumPhoto, firstAlbum)
      const newFavorites = addPhotoToFavorites(
        favorites,
        firstAlbumPhoto,
        firstAlbum
      )

      expect(favorites).toBe(newFavorites)
    })

    test('add another photo to favorites should add that photo', () => {
      const favorites = addPhotoToFavorites([], firstAlbumPhoto, firstAlbum)
      const newFavorites = addPhotoToFavorites(
        favorites,
        secondAlbumPhoto,
        firstAlbum
      )

      expect(newFavorites).toHaveLength(2)
    })
  })

  describe('remove photo from favorites', () => {
    test('remove favorite photo', () => {
      const favorites = addPhotoToFavorites([], firstAlbumPhoto, firstAlbum)
      const newFavorites = removePhotoFromFavorites(favorites, firstAlbumPhoto)

      expect(newFavorites).toHaveLength(0)
    })

    test('should not remove anything if photo is not in favorite', () => {
      expect(removePhotoFromFavorites([], firstAlbumPhoto)).toHaveLength(0)

      const favorites = addPhotoToFavorites([], firstAlbumPhoto, firstAlbum)
      const newFavorites = removePhotoFromFavorites(favorites, secondAlbumPhoto)

      expect(newFavorites).toHaveLength(1)
    })
  })

  test('get favorite photo by photo id', () => {
    const favorites = addPhotoToFavorites([], firstAlbumPhoto, firstAlbum)
    const favorites_ = addPhotoToFavorites(
      favorites,
      secondAlbumPhoto,
      firstAlbum
    )

    const foundPhoto = getFavoriteByPhotoId(
      favorites_,
      firstAlbumPhoto.id
    ) as FavoritePhoto
    expect(foundPhoto.id).toBe(firstAlbumPhoto.id)

    const notFound = getFavoriteByPhotoId(favorites_, thirdAlbumPhoto.id)
    expect(notFound).toBeNull()
  })

  test('toggle photo to favorites', () => {
    const favorites = toggleFavoritePhoto([], firstAlbumPhoto, firstAlbum)
    expect(favorites).toHaveLength(1)

    const favorites_ = toggleFavoritePhoto(
      favorites,
      firstAlbumPhoto,
      firstAlbum
    )
    expect(favorites_).toHaveLength(0)

    const favorites__ = toggleFavoritePhoto(
      favorites_,
      firstAlbumPhoto,
      firstAlbum
    )
    expect(favorites__).toHaveLength(1)
  })
})
