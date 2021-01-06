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
      <div className="card-body bg-light">
        <h5 className="card-title text-truncate mb-1">
          <Link
            className="text-danger text-capitalize text-decoration-none font-weight-bold"
            to={`/albums/${albumId}`}
          >
            {title}
          </Link>
        </h5>
        <div>
          <span className="text-muted mr-2">By</span>
          <span className="font-italic">
            {userId ? (
              <Link
                className="text-reset text-decoration-none font-weight-bold"
                to={`/users/${userId}`}
              >
                {username}
              </Link>
            ) : (
              username
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AlbumCard
