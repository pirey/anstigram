import { Link } from 'react-router-dom'

interface Props {
  title: string
  albumId: number
  userId: number | null
  userName: string
  className?: string
}

function AlbumCard(props: Props) {
  const { albumId, userId, title, userName: username, className = '' } = props
  return (
    <div className={`card shadow-sm rounded-lg ${className}`}>
      <img
        src={`https://picsum.photos/seed/${title}/200`}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body bg-light pt-2">
        <div className="card-title text-truncate mb-0">
          <Link
            className="text-danger text-capitalize text-decoration-none font-weight-bold"
            to={`/albums/${albumId}`}
          >
            {title}
          </Link>
        </div>
        <small className="font-italic">
          <span className="text-muted mr-1">By</span>
          <span>
            {userId ? (
              <Link
                className="text-reset text-decoration-none"
                to={`/users/${userId}`}
              >
                {username}
              </Link>
            ) : (
              username
            )}
          </span>
        </small>
      </div>
    </div>
  )
}

export default AlbumCard
