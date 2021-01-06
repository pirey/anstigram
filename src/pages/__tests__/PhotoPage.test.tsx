import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { albums as albumsMock, photos as photosMock } from 'mocks'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import PhotoPage from 'pages/PhotoPage'

const firstAlbum = albumsMock[0]
const firstPhoto = photosMock.filter(
  photo => photo.albumId === firstAlbum.id
)[0]

describe('comment feature / photo detail', () => {
  test('show loading', async () => {
    render(
      <MemoryRouter initialEntries={[`/photos/${firstAlbum.id}`]}>
        <Switch>
          <Route path="/photos/:photoId" exact component={PhotoPage} />
        </Switch>
      </MemoryRouter>
    )

    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))
  })

  test('header elements', async () => {
    render(
      <MemoryRouter initialEntries={[`/photos/${firstPhoto.id}`]}>
        <Switch>
          <Route path="/photos/:photoId" exact component={PhotoPage} />
        </Switch>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    expect(screen.getByRole('link', { name: /back/i })).toBeInTheDocument()
    expect(screen.getByText(RegExp(firstPhoto.title, 'i'))).toBeInTheDocument()
    expect(screen.getByText(RegExp(firstAlbum.title, 'i'))).toBeInTheDocument()
  })
})
