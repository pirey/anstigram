import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import { albums as albumsMock } from 'mocks'

describe('MainPage', () => {
  test('show and hide loading', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))
  })

  test('loads and displays albums', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )

    expect(await screen.findByRole('list')).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(albumsMock.length)
  })

  test('show filter control', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const filterByAlbumButton = screen.getByRole('button', {
      name: /by title/i
    })
    const filterByUserButton = screen.getByRole('button', {
      name: /by user/i
    })
    const searchInput = screen.getByPlaceholderText(/search/i)

    expect(filterByAlbumButton).toBeInTheDocument()
    expect(filterByUserButton).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
  })

  test('derive filter by album title from query string', async () => {
    render(
      <MemoryRouter initialEntries={[`/?filter_by=album`]}>
        <MainPage />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const searchInput = screen.getByPlaceholderText(/search/i)

    userEvent.type(searchInput, 'album')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    userEvent.clear(searchInput)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)

    userEvent.type(searchInput, 'one')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    userEvent.clear(searchInput)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('derive filter by user from query string', async () => {
    render(
      <MemoryRouter initialEntries={[`/?filter_by=user`]}>
        <MainPage />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const searchInput = screen.getByPlaceholderText(/search/i)

    userEvent.type(searchInput, 'leanne')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    userEvent.clear(searchInput)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)

    userEvent.type(searchInput, 'ervin')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)

    userEvent.clear(searchInput)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('derive filter search from query string', async () => {
    render(
      <MemoryRouter initialEntries={[`/?filter_by=user&search=leanne`]}>
        <MainPage />
      </MemoryRouter>
    )

    expect(await screen.findAllByRole('listitem')).toHaveLength(2)
  })

  test('can change filter type', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const filterByAlbumButton = screen.getByRole('button', {
      name: /by title/i
    })
    const filterByUserButton = screen.getByRole('button', {
      name: /by user/i
    })
    const searchInput = screen.getByPlaceholderText(/search/i)

    userEvent.click(filterByAlbumButton)
    userEvent.clear(searchInput)
    userEvent.type(searchInput, 'album')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    userEvent.click(filterByUserButton)
    userEvent.clear(searchInput)
    userEvent.type(searchInput, 'ervin')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })

  test('change filter type updates query string', async () => {
    let testLocation

    render(
      <MemoryRouter>
        <MainPage />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location
            return null
          }}
        />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const filterByAlbumButton = screen.getByRole('button', {
      name: /by title/i
    })
    const filterByUserButton = screen.getByRole('button', {
      name: /by user/i
    })

    userEvent.click(filterByAlbumButton)
    const qs1 = new URLSearchParams((testLocation as any).search)
    expect(qs1.has('filter_by')).toBe(true)
    expect(qs1.get('filter_by')).toBe('album')

    userEvent.click(filterByUserButton)
    const qs2 = new URLSearchParams((testLocation as any).search)
    expect(qs2.has('filter_by')).toBe(true)
    expect(qs2.get('filter_by')).toBe('user')
  })

  test('change search query updates query string', async () => {
    let testLocation

    render(
      <MemoryRouter>
        <MainPage />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location
            return null
          }}
        />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const searchInput = screen.getByPlaceholderText(/search/i)

    userEvent.clear(searchInput)
    userEvent.type(searchInput, 'testing')
    const qs1 = new URLSearchParams((testLocation as any).search)
    expect(qs1.has('search')).toBe(true)
    expect(qs1.get('search')).toBe('testing')

    userEvent.clear(searchInput)
    const qs2 = new URLSearchParams((testLocation as any).search)
    expect(qs2.has('search')).toBe(false)
  })

  test('show no results message if search not found', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const searchInput = screen.getByPlaceholderText(/search/i)
    userEvent.type(searchInput, 'foo bar bazz should be not found')

    expect(screen.getByText(/no results/i)).toBeInTheDocument()
  })
})
