import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import UserPage from 'pages/UserPage'
import { albums as albumsMock, users as usersMock } from 'mocks'

const firstUser = usersMock[0]
const userAlbums = albumsMock.filter(album => album.userId === firstUser.id)

describe('UserPage', () => {
  test('loads and displays albums', async () => {
    render(
      <MemoryRouter initialEntries={[`/users/${firstUser.id}`]}>
        <Switch>
          <Route path="/users/:userId" exact component={UserPage} />
        </Switch>
      </MemoryRouter>
    )

    expect(screen.getByText(/loading.../i)).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i))

    expect(screen.getByRole('list')).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(userAlbums.length)
  })
})
