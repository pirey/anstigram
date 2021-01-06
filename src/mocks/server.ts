import { rest } from 'msw'
import { setupServer } from 'msw/node'
import albumsMock from './albums'
import usersMock from './users'
import photosMock from './photos'

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/albums', (_req, res, ctx) => {
    return res(ctx.delay(10), ctx.json(albumsMock))
  }),

  rest.get(
    'https://jsonplaceholder.typicode.com/albums/:albumId',
    (req, res, ctx) => {
      const { albumId } = req.params
      return res(
        ctx.delay(10),
        ctx.json(albumsMock.find(album => album.id === parseInt(albumId)))
      )
    }
  ),

  rest.get(
    'https://jsonplaceholder.typicode.com/users/:userId',
    (req, res, ctx) => {
      const { userId } = req.params
      return res(
        ctx.delay(10),
        ctx.json(usersMock.find(user => user.id === parseInt(userId)))
      )
    }
  ),

  rest.get('https://jsonplaceholder.typicode.com/users', (_req, res, ctx) => {
    return res(ctx.delay(10), ctx.json(usersMock))
  }),

  rest.get('https://jsonplaceholder.typicode.com/photos', (req, res, ctx) => {
    const albumId = req.url.searchParams.get('albumId')
    const photosResult = albumId
      ? photosMock.filter(photo => photo.albumId === parseInt(albumId))
      : photosMock
    return res(ctx.delay(10), ctx.json(photosResult))
  })
)

export { server, rest }
