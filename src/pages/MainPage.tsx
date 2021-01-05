import { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Album, User } from 'models'

type FilterType = 'album' | 'user'

function fetchAlbums() {
  return fetch('https://jsonplaceholder.typicode.com/albums', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

function fetchUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

function getAlbumUser(users: User[], album: Album): User | undefined {
  return users.find(user => album.userId === user.id)
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
    const filteredAlbums = albums.filter(album => {
      return album.title.toLowerCase().indexOf(title) !== -1
    })

    return filteredAlbums
  }

  const filterAlbumByUser = (
    albums: Album[],
    users: User[],
    userName: string
  ): Album[] => {
    const filteredAlbums = albums.filter(album => {
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
    <div>
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend d-none d-sm-flex">
            <button
              type="button"
              className={`rounded-0 btn ${
                filterBy === 'album' ? 'btn-secondary' : 'btn-outline-secondary'
              }`}
              onClick={() => changeFilterType('album')}
            >
              By album
            </button>
            <button
              type="button"
              className={`btn ${
                filterBy === 'user' ? 'btn-secondary' : 'btn-outline-secondary'
              }`}
              onClick={() => changeFilterType('user')}
            >
              By user
            </button>
          </div>
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            type="search"
            className="form-control rounded-0"
          />
        </div>
      </div>
      <ul>
        {filteredAlbums.map(album => {
          const albumUser = getAlbumUser(users, album)
          return (
            <li key={album.id}>
              {album.title} - by {albumUser ? albumUser.name : 'unknown'}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MainPage
