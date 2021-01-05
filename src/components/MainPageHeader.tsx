import { Link } from 'react-router-dom'
import { FilterType } from 'models'

interface Props {
  filterType: FilterType
  search: string
  onChangeFilterType: (filterType: FilterType) => void
  onSearch: (search: string) => void
}

function MainPageHeader(props: Props) {
  const { search, filterType, onChangeFilterType, onSearch } = props
  return (
    <header className="container-xl my-3">
      <div className="row align-items-center">
        <div className="col-sm-12 col-md-4 col-lg-3 mb-3 mb-md-0 d-flex justify-content-center">
          <button
            type="button"
            className={`mr-1 rounded-pill btn btn-lg ${
              filterType === 'album' ? 'btn-danger' : 'btn-outline-danger'
            }`}
            onClick={() => onChangeFilterType('album')}
          >
            By Title
          </button>
          <button
            type="button"
            className={`ml-1 rounded-pill btn btn-lg ${
              filterType === 'user' ? 'btn-danger' : 'btn-outline-danger'
            }`}
            onClick={() => onChangeFilterType('user')}
          >
            By User
          </button>
        </div>
        <div className="d-none d-sm-block d-md-none col-sm-2"></div>
        <div className="col-sm-8 col-md-5 col-lg-6">
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search"
            type="search"
            className="form-control form-control-lg rounded-pill bg-light"
          />
        </div>
        <div className="d-none d-sm-block d-md-none col-sm-2"></div>
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
  )
}

export default MainPageHeader
