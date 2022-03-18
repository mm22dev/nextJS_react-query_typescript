import { IPerson, IInfinitePersons } from 'lib/interfaces/IPerson'
import { getBaseURL } from '../../utils/urls'

export const getPersonById = async (id: string | string[] | undefined): Promise<IPerson> => {
  const res = await fetch(`${getBaseURL()}/api/person/${id}`)
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
  const res = await fetch(`${getBaseURL()}/api/persons?size=${size}&offset=${offset}`)
  if (res.ok) return res.json()
  throw new Error('Error fetching infinite persons')
}
