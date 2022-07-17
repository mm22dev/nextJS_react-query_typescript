// libs
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { renderHook, act } from '@testing-library/react-hooks'
import crypto from 'crypto'
// hooks
import { personsQueryFactory, usePersons, useInfinitePersons } from './usePersons'
// helpers
import { server, rest } from '../utils/tests'
import { getBaseURL } from '../utils/urls'
// moks
import { db } from 'mocks/db'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('usePersons hook', () => {
  it('fails to fetch persons', async () => {
    server.use(
      rest.get(`${getBaseURL()}/api/person/:personId`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            message: 'Error message',
          }),
        )
      }),
    )

    const { result, waitFor } = renderHook(
      () => usePersons({ queryKey: personsQueryFactory.infos, personId: 'abcd' }),
      { wrapper },
    )

    await waitFor(() => result.current.isError)
    expect(result.current.error.data.message).toBe('Error message')
  })

  it('succeeds to fetch a person by id', async () => {
    const personId = 'abcd'
    const person = db.person.create({ id: personId })

    server.use(
      rest.get(`${getBaseURL()}/api/person/:personId`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(person))
      }),
    )

    const { result, waitFor } = renderHook(
      () => usePersons({ queryKey: personsQueryFactory.infos, personId }),
      { wrapper },
    )

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data.id).toEqual(person.id)
    expect(result.current.data).toEqual(JSON.parse(JSON.stringify(person)))
  })

  it('succeeds to fetch infinite persons', async () => {
    const count = 10
    const persons = Array.from({ length: count }, () =>
      JSON.parse(JSON.stringify(db.person.create({ id: crypto.randomBytes(8).toString('hex') }))),
    )

    server.use(
      rest.get(`${getBaseURL()}/api/persons`, (req, res, ctx) => {
        const query = req.url.searchParams
        const size = parseInt(query.get('size'), 10)
        const offset = parseInt(query.get('offset'), 10)
        return res(
          ctx.status(200),
          ctx.json({ count, size, offset, persons: persons.slice(offset, offset + size) }),
        )
      }),
    )

    const { result, waitFor } = renderHook(
      () => useInfinitePersons({ queryKey: personsQueryFactory.all }),
      { wrapper },
    )

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data.pages.length).toEqual(1)
    expect(result.current.data.pages[0].offset).toEqual(0)
    expect(result.current.data.pages[0].persons).toEqual(persons.slice(0, 4))
    expect(result.current.hasNextPage).toEqual(true)

    await act(() => result.current.fetchNextPage())
    await waitFor(() => result.current.isSuccess)

    expect(result.current.data.pages.length).toEqual(2)
    expect(result.current.data.pages[1].offset).toEqual(4)
    expect(result.current.data.pages[1].persons).toEqual(persons.slice(4, 8))
    expect(result.current.hasNextPage).toEqual(true)

    await act(() => result.current.fetchNextPage())
    await waitFor(() => result.current.isSuccess)

    expect(result.current.data.pages.length).toEqual(3)
    expect(result.current.data.pages[2].offset).toEqual(8)
    expect(result.current.data.pages[2].persons).toEqual(persons.slice(-2))
    expect(result.current.hasNextPage).toEqual(false)
  })
})
