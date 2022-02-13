import { IPerson } from 'lib/interfaces/IPerson'

export const getPersonById = async (id: string | string[] | undefined): Promise<IPerson> => {
  if (typeof id === 'string') {
    const res = await fetch(`/api/person/${id}`)
    return res.json()
  }
  throw new Error('invalid id') // need to throw because react-query functions need to have error thrown to know its in error state
}
