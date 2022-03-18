import { IPerson, IInfinitePersons } from 'lib/interfaces/IPerson'
import { getBaseURL } from '../../utils/urls'
import axios from 'axios'

export const getPersonById = async (id: string | string[] | undefined): Promise<IPerson> =>
  axios
    .get(`${getBaseURL()}/api/person/${id}`)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response))

export const getInfinitePersons = async ({
  size,
  offset,
}: {
  size: number
  offset: number
}): Promise<IInfinitePersons> =>
  axios
    .get(`${getBaseURL()}/api/persons`, { params: { size, offset } })
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response))
