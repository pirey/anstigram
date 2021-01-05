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
    <div className={`card ${className}`}>
      <img
        src={`https://picsum.photos/seed/${title}/200`}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">
          <Link to={`/album/${albumId}`}>{title}</Link>
        </h5>
        <div>
          <span className="text-muted mr-2">By</span>
          <span className="font-italic">
            {userId ? (
              <Link to={`/users/${userId}`}>{username}</Link>
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
