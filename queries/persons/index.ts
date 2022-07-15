import { IPerson, IInfinitePersons } from 'lib/interfaces/IPerson'

const protocol = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https' : 'http'

export const getPersonById = async (id: string | string[] | undefined): Promise<IPerson> => {
  const res = await fetch(`${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/person/${id}`)
  if (res.ok) return res.json()
  throw new Error('Error fetching person by id')
}

export const getInfinitePersons = async ({
  size,
  offset,
}: {
  size: number
  offset: number
}): Promise<IInfinitePersons> => {
  const res = await fetch(
    `${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/persons?size=${size}&offset=${offset}`,
  )
  if (res.ok) return res.json()
  throw new Error('Error fetching infinite persons')
}
