import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
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

    const filterByAlbumTitle = screen.getByRole('button', {
      name: /by title/i
    })
    const filterByUserName = screen.getByRole('button', {
      name: /by user/i
    })
    const searchInput = screen.getByPlaceholderText(/search/i)

    expect(filterByAlbumTitle).toBeInTheDocument()
    expect(filterByUserName).toBeInTheDocument()
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

    const filterByAlbumTitle = screen.getByRole('button', {
      name: /by title/i
    })
    const filterByUserName = screen.getByRole('button', {
      name: /by user/i
    })
    const searchInput = screen.getByPlaceholderText(/search/i)

    userEvent.click(filterByAlbumTitle)
    userEvent.clear(searchInput)
    userEvent.type(searchInput, 'album')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    userEvent.click(filterByUserName)
    userEvent.clear(searchInput)
    userEvent.type(searchInput, 'ervin')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})
