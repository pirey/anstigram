import { useEffect, useState } from 'react'
import { FavoritePhoto } from 'models'

const FAVORITE_LS_KEY = 'favorites'

function useFavoritePhotos() {
  const [favorites, setFavorites_] = useState<FavoritePhoto[]>([])

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem(FAVORITE_LS_KEY) || '[]')
      setFavorites_(favs)
    } catch (_e) {
      setFavorites_([])
    }
  }, [])

  // wrap the original setter to also store favorites to storage
  const setFavorites = (favorites: FavoritePhoto[]) => {
    setFavorites_(favorites)
    localStorage.setItem(FAVORITE_LS_KEY, JSON.stringify(favorites))
  }

  return [favorites, setFavorites] as const
}

export default useFavoritePhotos
