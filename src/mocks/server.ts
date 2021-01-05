import { rest } from 'msw'
import { setupServer } from 'msw/node'
import albumsMock from './albums'
import usersMock from './users'
import photosMock from './photos'

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/albums', (_req, res, ctx) => {
    setTimeout(() => {})
    return res(ctx.delay(10), ctx.json(albumsMock))
  }),

  rest.get('https://jsonplaceholder.typicode.com/users', (_req, res, ctx) => {
    return res(ctx.delay(10), ctx.json(usersMock))
  }),

  rest.get('https://jsonplaceholder.typicode.com/photos', (_req, res, ctx) => {
    return res(ctx.delay(10), ctx.json(photosMock))
  })
)

export { server, rest }
