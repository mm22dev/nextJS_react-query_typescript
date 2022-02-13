import { IPerson, IInfinitePersons } from 'lib/interfaces/IPerson'

export const getPersonById = async (id: string | string[] | undefined): Promise<IPerson> => {
  if (typeof id === 'string') {
    const res = await fetch(`http://localhost:3000/api/person/${id}`)
    return res.json()
  }
  throw new Error('invalid id') // need to throw because react-query functions need to have error thrown to know its in error state
}

export const getInfinitePersons = async ({
  size,
  offset,
}: {
  size: number
  offset: number
}): Promise<IInfinitePersons> => {
  const res = await fetch(`http://localhost:3000/api/persons?size=${size}&offset=${offset}`)
  return res.json()
}
