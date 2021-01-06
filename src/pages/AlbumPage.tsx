import { fetchAlbum, fetchAlbumPhotos, fetchUser } from 'api'
import { Loading, PhotoCard, ErrorMessage } from 'components'
import {
  Album,
  Photo,
  toggleFavoritePhoto,
  isPhotoFavorited,
  User,
} from 'models'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCommentsByPhotoId, useFavoritePhotos } from 'hooks'

interface Params {
  albumId?: string | undefined
}

function AlbumPage() {
  const { albumId } = useParams<Params>()

  const [errorMessage, setErrorMessage] = useState('')
  const [commentsByPhotoId] = useCommentsByPhotoId()
  const [favorites, setFavorites] = useFavoritePhotos()
  const [user, setUser] = useState<User | null>(null)
  const [album, setAlbum] = useState<Album | null>(null)
  const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  const handleLikeButtonClick = (photo: Photo) => {
    if (!album) {
      return
    }
    const newFavorites = toggleFavoritePhoto(favorites, photo, album)
    setFavorites(newFavorites)
  }

  useEffect(() => {
    if (!albumId) {
      return
    }

    setLoading(true)
    Promise.all([
      fetchAlbum(parseInt(albumId)),
      fetchAlbumPhotos(parseInt(albumId)),
    ])
      .then(([album, albumPhotos]) => {
        setAlbum(album)
        setAlbumPhotos(albumPhotos)

        return fetchUser(album.userId)
      })
      .then(setUser)
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false))
  }, [albumId])

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />
  }

  if (loading || !user || !album) {
    return <Loading />
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
              {album.title}
            </h1>
            <small className="font-italic">
              <span className="text-muted mr-2">By</span>
              <Link
                to={`/users/${user.id}`}
                className="text-decoration-none text-reset font-weight-bold mr-2"
              >
                {user.name}
              </Link>
              <span className="text-lowercase text-muted">{user.email}</span>
            </small>
          </div>
        </div>
      </header>
      <main className="container-xl">
        <section className="row" role="list">
          {albumPhotos.map((photo) => (
            <div
              key={photo.id}
              className="col-sm-6 col-md-4 col-lg-3 mb-3"
              role="listitem"
            >
              <PhotoCard
                photo={photo}
                commentCount={
                  commentsByPhotoId[photo.id]
                    ? commentsByPhotoId[photo.id].length
                    : 0
                }
                liked={isPhotoFavorited(favorites, photo)}
                onLikeButtonClick={handleLikeButtonClick}
                className="h-100"
              />
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default AlbumPage
