import { Photo } from 'models'

interface Props {
  liked?: boolean
  commentCount?: number
  photo: Photo
  className?: string
}

function PhotoCard(props: Props) {
  const {
    photo,
    commentCount = 0,
    liked = false,
    className = ''
  } = props

  return (
    <div className={`card shadow-sm rounded-lg ${className}`}>
      <img
        src={`https://picsum.photos/seed/${photo.title}/200`}
        className="card-img-top"
        alt={photo.title}
      />
      <div className="card-footer bg-white d-flex flex-row py-1 px-0">
        {liked ? (
          <button className="btn btn-sm btn-link flex-grow-1 text-decoration-none text-danger font-weight-bold">
            Liked
          </button>
        ) : (
          <button className="btn btn-sm btn-link flex-grow-1 text-decoration-none text-muted font-weight-bold">
            Like
          </button>
        )}
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
