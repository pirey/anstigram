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

  test('click like button', async () => {
    render(
      <MemoryRouter initialEntries={[`/photos/${firstPhoto.id}`]}>
        <Switch>
          <Route path="/photos/:photoId" exact component={PhotoPage} />
        </Switch>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const likeButton = screen.getByRole('button', { name: 'Like' })
    userEvent.click(likeButton)

    expect(
      screen.queryByRole('button', { name: 'Like' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Liked' })).toBeInTheDocument()
  })

  test('add comment', async () => {
    render(
      <MemoryRouter initialEntries={[`/photos/${firstPhoto.id}`]}>
        <Switch>
          <Route path="/photos/:photoId" exact component={PhotoPage} />
        </Switch>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const input = screen.getByPlaceholderText(
      /add a comment/i
    ) as HTMLInputElement
    const sendButton = screen.getByRole('button', { name: /send/i })
    userEvent.type(input, 'test comment')
    userEvent.click(sendButton)

    // reset input
    expect(input.value).toBe('')
    expect(screen.getByText('test comment')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(1)
  })

  test('delete comment', async () => {
    render(
      <MemoryRouter initialEntries={[`/photos/${firstPhoto.id}`]}>
        <Switch>
          <Route path="/photos/:photoId" exact component={PhotoPage} />
        </Switch>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    const input = screen.getByPlaceholderText(
      /add a comment/i
    ) as HTMLInputElement
    const sendButton = screen.getByRole('button', { name: /send/i })
    userEvent.type(input, 'test comment')
    userEvent.click(sendButton)

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    userEvent.click(deleteButton)

    expect(screen.queryByText('test comment')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /delete/i })
    ).not.toBeInTheDocument()
  })
})
