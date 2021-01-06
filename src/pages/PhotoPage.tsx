import { Link, useParams } from 'react-router-dom'
import { Loading } from 'components'
import { useState, useEffect } from 'react'
import { fetchAlbum, fetchPhoto } from 'api'
import { useFavoritePhotos } from 'hooks'
import { Album, Photo } from 'models'
import styles from './PhotoPage.module.css'

interface Params {
  photoId?: string | undefined
}

function PhotoPage() {
  const { photoId } = useParams<Params>()

  const [favorites, setFavorites] = useFavoritePhotos()
  const [album, setAlbum] = useState<Album | null>(null)
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!photoId) {
      return
    }

    setLoading(true)
    fetchPhoto(parseInt(photoId))
      .then(photo => {
        return fetchAlbum(parseInt(photo.albumId)).then(album => {
          setPhoto(photo)
          setAlbum(album)
        })
      })
      .finally(() => setLoading(false))
  }, [photoId])

  if (loading || !album || !photo) {
    return <Loading />
  }

  return (
    <>
      <header className="container-xl my-3">
        <div className="row align-items center">
          <div className="mt-3 mt-sm-0 order-last order-sm-first col-12 col-sm-2 col-lg-1 d-flex align-items-center justify-content-start">
            <Link
              to={`/albums/${album.id}`}
              className="text-lg text-danger text-decoration-none font-weight-bolder"
            >
              Back
            </Link>
          </div>
          <div className="col-sm-10 col-lg-11 d-flex flex-column justify-content-center">
            <h1 className="h3 mb-0 text-capitalize font-weight-bold">
              {photo.title}
            </h1>
            <small className="font-italic">
              <span className="text-muted mr-2">Album</span>
              <Link
                to={`/albums/${album.id}`}
                className="text-decoration-none text-reset font-weight-bold mr-2"
              >
                {album.title}
              </Link>
            </small>
          </div>
        </div>
      </header>
      <main className="container-xl">
        <div className="row no-gutters border rounded-lg shadow-sm mb-3">
          <div
            className={`col-12 col-md-7 h-100 d-flex justify-content-center align-items-center bg-light overflow-hidden ${styles.imageColumn}`}
          >
            <img
              src={`https://picsum.photos/seed/${photo.title}/800`}
              className="img-fluid mb-3"
              alt={photo.title}
            />
          </div>
          <div
            className={`col-12 col-md-5 h-100 d-flex flex-column ${styles.commentColumn}`}
          >
            <div className="row my-3 no-gutters">
              <div className="col-2 d-flex justify-content-center align-items-center">
                <span className="font-weight-bold text-muted">Like</span>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Add a comment..."
                />
              </div>
              <div className="col-3 d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-block btn-danger mx-2 rounded-pill"
                  type="button"
                >
                  Send
                </button>
              </div>
            </div>
            <ul className="list-group list-group-flush overflow-auto">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default PhotoPage
