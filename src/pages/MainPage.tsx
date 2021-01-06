import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Album,
  User,
  FilterType,
  filterAlbumsByType,
  filterTypeFromString,
  getAlbumUser
} from 'models'
import { fetchAlbums, fetchUsers } from 'api'
import { AlbumCard, Loading, MainPageHeader } from 'components'

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

  const handleSearch = (search: string) => {
    const filteredAlbums = filterAlbumsByType(users, albums, search, filterBy)

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

  const handleChangeFilterType = (filterBy: FilterType) => {
    setFilterBy(filterBy)

    const filteredAlbums = filterAlbumsByType(users, albums, search, filterBy)

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
          setFilteredAlbums(filterAlbumsByType(users, albums, search, filterBy))
        }
      })
      .finally(() => setLoading(false))

    // only need to fetch the data once, hence force to use empty dependency for useEffect
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <MainPageHeader
        search={search}
        filterType={filterBy}
        onChangeFilterType={handleChangeFilterType}
        onSearch={handleSearch}
      />
      <main className="container-xl">
        {loading ? (
          <Loading />
        ) : (
          <section className="row" role="list">
            {filteredAlbums.map(album => {
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
          </section>
        )}
      </main>
    </>
  )
}

export default MainPage
