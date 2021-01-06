import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AlbumCard from 'components/AlbumCard'

describe('AlbumCard', () => {
  test('render properly', async () => {
    render(
      <BrowserRouter>
        <AlbumCard
          albumId={1}
          userId={1}
          title="album title"
          userName="user name"
        />
      </BrowserRouter>
    )

    expect(
      screen.getByRole('link', { name: /album title/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /user name/i })).toBeInTheDocument()
  })
})
