import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { photos as photosMock } from 'mocks'
import PhotoCard from '../PhotoCard'

const photo = photosMock[0]

describe('PhotoCard', () => {
  test('render image', async () => {
    render(<PhotoCard photo={photo} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  test('render like / favorite button', async () => {
    render(<PhotoCard photo={photo} />)

    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument()
  })

  test('render liked button if photo is liked', async () => {
    render(<PhotoCard photo={photo} liked={true} />)

    expect(screen.getByRole('button', { name: /liked/i })).toBeInTheDocument()
  })

  test('render comment button', async () => {
    render(<PhotoCard photo={photo} />)

    expect(screen.getByRole('button', { name: /comment/i })).toBeInTheDocument()
  })

  test('render comment count if any', async () => {
    render(<PhotoCard photo={photo} commentCount={7} />)

    expect(
      screen.getByRole('button', { name: /comment 7/i })
    ).toBeInTheDocument()
  })

  test('onLikeButtonClick', async () => {
    const fn = jest.fn()
    render(<PhotoCard photo={photo} commentCount={7} onLikeButtonClick={fn} />)

    userEvent.click(screen.getByRole('button', { name: /like/i }))

    expect(fn).toHaveBeenCalledWith(photo)
  })
})
