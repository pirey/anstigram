import { Link } from 'react-router-dom'
import { FavoritePhoto } from 'models'

interface Props {
  favoritePhoto: FavoritePhoto
  className?: string
  onRemove?: () => void
}

function FavoritePhotoCard(props: Props) {
  const { favoritePhoto, onRemove, className = '' } = props
  return (
    <div className={`card border-0 ${className}`}>
      <Link to={`/photos/${favoritePhoto.id}`}>
        <img
          src={`https://picsum.photos/seed/${favoritePhoto.title}/200`}
          className="card-img-top rounded-lg"
          alt={favoritePhoto.title}
        />
      </Link>
      <div className="card-body pt-2 px-0">
        <div className="card-title text-truncate mb-0">
          <Link
            className="text-danger text-capitalize text-decoration-none font-weight-bold"
            to={`/photos/${favoritePhoto.id}`}
          >
            {favoritePhoto.title}
          </Link>
        </div>
        <small className="font-italic card-text d-block text-truncate">
          <span className="text-muted mr-1">Album</span>
          <span>
            <Link
              className="text-reset text-decoration-none text-capitalize"
              to={`/albums/${favoritePhoto.albumId}`}
            >
              {favoritePhoto.albumTitle}
            </Link>
          </span>
        </small>
        <span
          className="btn btn-block btn-outline-danger rounded-pill mt-3"
          role="button"
          onClick={onRemove}
        >
          Remove
        </span>
      </div>
    </div>
  )
}

export default FavoritePhotoCard
