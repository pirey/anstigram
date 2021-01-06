// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import { server } from './mocks/server'

// const localStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
//   clear: jest.fn(),
//   length: 0,
//   key: jest.fn()
// }
// global.localStorage = localStorageMock

beforeAll(() => server.listen())

beforeEach(() => {
  server.resetHandlers()
  localStorage.clear()
})

afterAll(() => server.close())
