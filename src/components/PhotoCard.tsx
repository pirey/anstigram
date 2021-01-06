import { Photo } from 'models'

interface Props {
  liked?: boolean
  commentCount?: number
  photo: Photo
  className?: string
  onLikeButtonClick?: (photo: Photo) => void
}

function PhotoCard(props: Props) {
  const {
    photo,
    onLikeButtonClick,
    commentCount = 0,
    liked = false,
    className = ''
  } = props

  const handleLikeButtonClick = () => {
    if (!onLikeButtonClick) {
      return
    }

    onLikeButtonClick(photo)
  }

  return (
    <div className={`card shadow-sm rounded-lg ${className}`}>
      <img
        src={`https://picsum.photos/seed/${photo.title}/200`}
        className="card-img-top"
        alt={photo.title}
      />
      <div className="card-footer bg-white d-flex flex-row py-1 px-0">
        <button
          onClick={handleLikeButtonClick}
          className={`btn btn-sm btn-link flex-grow-1 text-decoration-none font-weight-bold ${
            liked ? 'text-danger' : 'text-muted'
          }`}
        >
          {liked ? 'Liked' : 'Like'}
        </button>
        <button className="btn btn-sm btn-link flex-grow-1 text-decoration-none text-muted font-weight-bold">
          Comment{' '}
          {commentCount <= 0 ? null : (
            <span className="badge badge-pill badge-danger">
              {commentCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default PhotoCard
