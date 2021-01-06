import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { photos as photosMock } from 'mocks'
import { MemoryRouter } from 'react-router-dom'
import PhotoCard from '../PhotoCard'

const photo = photosMock[0]

describe('PhotoCard', () => {
  test('render image', async () => {
    render(
      <MemoryRouter>
        <PhotoCard photo={photo} />
      </MemoryRouter>
    )

    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('render like / favorite button', async () => {
    render(
      <MemoryRouter>
        <PhotoCard photo={photo} />
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument()
  })

  test('render liked button if photo is liked', async () => {
    render(
      <MemoryRouter>
        <PhotoCard photo={photo} liked={true} />
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: /liked/i })).toBeInTheDocument()
  })

  test('render comment button', async () => {
    render(
      <MemoryRouter>
        <PhotoCard photo={photo} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /comment/i })).toBeInTheDocument()
  })

  test('render comment count if any', async () => {
    render(
      <MemoryRouter>
        <PhotoCard photo={photo} commentCount={7} />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /comment 7/i })).toBeInTheDocument()
  })

  test('onLikeButtonClick', async () => {
    const fn = jest.fn()
    render(
      <MemoryRouter>
        <PhotoCard photo={photo} commentCount={7} onLikeButtonClick={fn} />
      </MemoryRouter>
    )

    userEvent.click(screen.getByRole('button', { name: /like/i }))

    expect(fn).toHaveBeenCalledWith(photo)
  })
})
