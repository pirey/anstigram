import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Album, User } from 'models'
import AlbumCard from 'components/AlbumCard'

type FilterType = 'album' | 'user'

function fetchAlbums() {
  return fetch('https://jsonplaceholder.typicode.com/albums', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

function fetchUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

function getAlbumUser(users: User[], album: Album): User | undefined {
  return users.find((user) => album.userId === user.id)
}

function filterTypeFromString(s: string): FilterType {
  if (['album', 'user'].includes(s)) {
    return s as FilterType
  }

  return 'album'
}

function MainPage() {
  const history = useHistory()
  const location = useLocation()

  const qs = new URLSearchParams(location.search)
  const defaultFilterType = filterTypeFromString(qs.get('filter_by') || '')
  const defaultSearch = qs.get('search') || ''

  const [filterBy, setFilterBy] = useState<FilterType>(defaultFilterType)
  const [search, setSearch] = useState(defaultSearch)
  const [loading, setLoading] = useState(true)
  const [albums, setAlbums] = useState<Album[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([])

  const filterAlbumByTitle = (albums: Album[], title: string): Album[] => {
    const filteredAlbums = albums.filter((album) => {
      return album.title.toLowerCase().indexOf(title) !== -1
    })

    return filteredAlbums
  }

  const filterAlbumByUser = (
    albums: Album[],
    users: User[],
    userName: string
  ): Album[] => {
    const filteredAlbums = albums.filter((album) => {
      const albumUser = getAlbumUser(users, album)
      if (!albumUser) {
        return false
      }
      return albumUser.name.toLowerCase().indexOf(userName) !== -1
    })

    return filteredAlbums
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value

    const filteredAlbums =
      filterBy === 'album'
        ? filterAlbumByTitle(albums, search)
        : filterBy === 'user'
        ? filterAlbumByUser(albums, users, search)
        : filterAlbumByTitle(albums, search)

    setSearch(search)
    setFilteredAlbums(filteredAlbums)

    const qs = new URLSearchParams(location.search)
    if (search !== '') {
      qs.set('search', search)
    } else {
      qs.delete('search')
    }
    history.push(`?${qs.toString()}`)
  }

  const changeFilterType = (filterBy: FilterType) => {
    setFilterBy(filterBy)

    const filteredAlbums =
      filterBy === 'album'
        ? filterAlbumByTitle(albums, search)
        : filterBy === 'user'
        ? filterAlbumByUser(albums, users, search)
        : filterAlbumByTitle(albums, search)

    setFilteredAlbums(filteredAlbums)

    const qs = new URLSearchParams(location.search)
    qs.set('filter_by', filterBy)
    history.push(`?${qs.toString()}`)
  }

  useEffect(() => {
    setLoading(true)

    Promise.all([fetchAlbums(), fetchUsers()])
      .then(([albums, users]) => {
        setAlbums(albums)
        setUsers(users)

        if (search === '') {
          setFilteredAlbums(albums)
        } else {
          if (filterBy === 'album') {
            setFilteredAlbums(filterAlbumByTitle(albums, search))
          } else if (filterBy === 'user') {
            setFilteredAlbums(filterAlbumByUser(albums, users, search))
          }
        }
      })
      .finally(() => setLoading(false))

    // only need to fetch the data once, hence force to use empty dependency for useEffect
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <header className="container-fluid my-3">
        <div className="row align-items-center">
          <div className="col-sm-6 col-md-4 col-lg-3 mb-3 mb-sm-0 d-flex justify-content-center">
            <button
              type="button"
              className={`mr-1 rounded-pill btn btn-lg ${
                filterBy === 'album' ? 'btn-danger' : 'btn-outline-danger'
              }`}
              onClick={() => changeFilterType('album')}
            >
              By Album
            </button>
            <button
              type="button"
              className={`ml-1 rounded-pill btn btn-lg ${
                filterBy === 'user' ? 'btn-danger' : 'btn-outline-danger'
              }`}
              onClick={() => changeFilterType('user')}
            >
              By User
            </button>
          </div>
          <div className="col-sm-6 col-md-5 col-lg-6">
            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search"
              type="search"
              className="form-control form-control-lg rounded-pill bg-light"
            />
          </div>
          <div className="col-sm-12 col-md-3 my-3 my-md-0 d-flex justify-content-center">
            <Link
              to="/favorites"
              className="text-lg text-danger text-decoration-none font-weight-bolder"
            >
              My Favorites
            </Link>
          </div>
        </div>
      </header>
      <main className="container-fluid">
        <div className="row" role="list">
          {filteredAlbums.map((album) => {
            const albumUser = getAlbumUser(users, album)
            return (
              <div
                className="col-sm-6 col-md-4 col-lg-3 mb-3"
                role="listitem"
                key={album.id}
              >
                <AlbumCard
                  albumId={album.id}
                  title={album.title}
                  userId={albumUser ? albumUser.id : null}
                  userName={albumUser ? albumUser.name : 'Unknown'}
                  className="h-100"
                />
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

export default MainPage
