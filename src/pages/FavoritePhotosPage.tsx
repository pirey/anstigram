import { Link } from 'react-router-dom'
import { FavoritePhotoCard, Message } from 'components'
import { useFavoritePhotos } from 'hooks'
import { FavoritePhoto, Photo, removePhotoFromFavorites } from 'models'

function FavoritePhotosPage() {
  const [favorites, setFavorites] = useFavoritePhotos()

  const handleRemoveFromFavorite = (favoritePhoto: FavoritePhoto) => {
    const { albumId, albumTitle, ...photo } = favoritePhoto
    const newFavorites = removePhotoFromFavorites(favorites, photo as Photo)
    setFavorites(newFavorites)
  }

  return (
    <>
      <header className="container-xl my-3">
        <div className="row align-items center">
          <div className="mt-3 mt-sm-0 order-last order-sm-first col-12 col-sm-2 col-lg-1 d-flex align-items-center justify-content-start">
            <Link
              to="/"
              className="text-lg text-danger text-decoration-none font-weight-bolder"
            >
              Back
            </Link>
          </div>
          <div className="col-sm-10 col-lg-11 d-flex flex-column justify-content-center">
            <h1 className="h3 mb-0 text-capitalize font-weight-bold">
              My Favorites
            </h1>
          </div>
        </div>
      </header>
      <main className="container-xl">
        {favorites.length <= 0 ? (
          <Message>You don't have any favorite photos, yet...</Message>
        ) : (
          <div className="row">
            {favorites.map(favorite => (
              <div
                key={favorite.id}
                className="col-sm-6 col-md-4 col-lg-3 mb-3"
                role="listitem"
              >
                <FavoritePhotoCard
                  onRemove={() => handleRemoveFromFavorite(favorite)}
                  favoritePhoto={favorite}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default FavoritePhotosPage
