import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import {
  albums as albumsMock,
  photos as photosMock,
  users as usersMock
} from 'mocks'
import AlbumPage from 'pages/AlbumPage'
import { User } from 'models'
import userEvent from '@testing-library/user-event'

const firstAlbum = albumsMock[0]
const firstAlbumPhotos = photosMock.filter(
  photo => photo.albumId === firstAlbum.id
)
const albumUser = usersMock.find(user => user.id === firstAlbum.userId) as User

describe('AlbumPage', () => {
  test('loads album photos', async () => {
    render(
      <MemoryRouter initialEntries={[`/albums/${firstAlbum.id}`]}>
        <Switch>
          <Route path="/albums/:albumId" exact component={AlbumPage} />
        </Switch>
      </MemoryRouter>
    )

    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(
      firstAlbumPhotos.length
    )
  })

  test('show album title', async () => {
    render(
      <MemoryRouter initialEntries={[`/albums/${firstAlbum.id}`]}>
        <Switch>
          <Route path="/albums/:albumId" exact component={AlbumPage} />
        </Switch>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    expect(
      screen.getByRole('heading', { name: RegExp(firstAlbum.title, 'i') })
    ).toBeInTheDocument()
  })

  test('show user name and email and link to user page', async () => {
    render(
      <MemoryRouter initialEntries={[`/albums/${firstAlbum.id}`]}>
        <Switch>
          <Route path="/albums/:albumId" exact component={AlbumPage} />
        </Switch>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    expect(
      screen.getByRole('link', { name: RegExp(albumUser.name, 'i') })
    ).toBeInTheDocument()
    expect(screen.getByText(RegExp(albumUser.email, 'i'))).toBeInTheDocument()
  })

  describe('favorite photo feature', () => {
    test('clicking "like" button should change it to "liked" button and vice versa', async () => {
      render(
        <MemoryRouter initialEntries={[`/albums/${firstAlbum.id}`]}>
          <Switch>
            <Route path="/albums/:albumId" exact component={AlbumPage} />
          </Switch>
        </MemoryRouter>
      )

      await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

      const likeButton = screen.queryAllByRole('button', { name: /like/i })[0]
      userEvent.click(likeButton)

      const likedButton = screen.getByRole('button', { name: /liked/i })
      expect(likedButton).toBeInTheDocument()

      userEvent.click(likedButton)
      expect(
        screen.queryByRole('button', { name: /liked/i })
      ).not.toBeInTheDocument()
    })
  })
})
