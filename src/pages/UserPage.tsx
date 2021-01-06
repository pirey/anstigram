import { fetchUser, fetchUserAlbums } from 'api'
import { AlbumCard, Loading } from 'components'
import { Album, User } from 'models'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

interface Params {
  userId?: string | undefined
}

function UserPage() {
  const { userId = '' } = useParams<Params>()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [albums, setAlbums] = useState<Album[]>([])

  useEffect(() => {
    setLoading(true)
    fetchUser(parseInt(userId))
      .then((user) => {
        return fetchUserAlbums(parseInt(userId)).then((albums) => {
          setAlbums(albums)
          setUser(user)
        })
      })
      .finally(() => setLoading(false))
  }, [userId])

  if (loading || !user) {
    return <Loading />
  }

  return (
    <>
      <header className="container-xl my-3">
        <div className="row align-items center">
          <div className="mt-3 mt-sm-0 col-12 d-flex align-items-center justify-content-start">
            <Link
              to="/"
              className="text-lg text-danger text-decoration-none font-weight-bolder"
            >
              Back to Main
            </Link>
          </div>
        </div>
      </header>
      <main className="container-xl mt-3">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <div className="card border-0">
              <div className="card-body text-center text-md-left">
                <div className="card-title h4 font-weight-bold mb-0">
                  {user.name}
                </div>
                <div className="card-text text-muted">@{user.username}</div>

                <button className="mt-3 btn btn-outline-danger rounded-pill px-5 mw-100 font-weight-bold">
                  Message
                </button>

                <div className="card-text font-weight-bold mt-3">Contact</div>
                <div className="card-text text-muted">{user.email}</div>
                <div className="card-text text-muted">{user.phone}</div>
                <a
                  className="d-block card-text text-decoration-none text-muted font-weight-bold"
                  href="/"
                  target="__blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>

                <div className="card-text font-weight-bold mt-3">Address</div>
                <div className="card-text text-muted">
                  {user.address.street}, {user.address.suite}
                </div>
                <div className="card-text text-muted">
                  {user.address.city} {user.address.zipcode}
                </div>

                <div className="card-text font-weight-bold mt-3">Company</div>
                <div className="card-text text-muted">{user.company.name}</div>
                <div className="card-text text-muted">
                  {user.company.catchPhrase}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="row" role="list">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="col-md-6 col-lg-4"
                  role="listitem"
                >
                  <AlbumCard
                    albumId={album.id}
                    userId={user.id}
                    userName={user.name}
                    title={album.title}
                    className="h-100"
                  />
                </div>
              ))}
              <div className="col-md-6 col-lg-4">
                <AlbumCard
                  albumId={1}
                  userId={1}
                  userName="Leanne Gravin"
                  title="First Album"
                  className="h-100"
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <AlbumCard
                  albumId={1}
                  userId={1}
                  userName="Leanne Gravin"
                  title="First Album"
                  className="h-100"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default UserPage
