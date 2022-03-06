// libs
import { useQuery, useInfiniteQuery } from 'react-query'
// types
import { IPerson, IInfinitePersons } from 'lib/interfaces/IPerson'
import { UseQueryResult, UseInfiniteQueryResult, QueryFunctionContext } from 'react-query'
// requests
import { getPersonById, getInfinitePersons } from 'queries/persons'

type queryFactory = {
  [queryKey: string]: (arg?: string) => readonly (string | undefined)[]
}

export const personsQueryFactory: queryFactory = {
  all: () => ['persons'] as const,
  infos: (personId) => [...personsQueryFactory.all(), personId] as const,
}

export function usePersons({
  queryKey,
  personId,
}: {
  queryKey: typeof personsQueryFactory[keyof queryFactory]
  personId?: string
}) {
  const personsQuery: UseQueryResult<IPerson, Error> = useQuery<IPerson, Error>(
    queryKey(personId),
    () => getPersonById(personId),
    { enabled: !!personId },
  )

  return personsQuery
}

export function useInfinitePersons({
  queryKey,
}: {
  queryKey: typeof personsQueryFactory[keyof queryFactory]
}) {
  const infinitePersonsQuery: UseInfiniteQueryResult<IInfinitePersons, Error> = useInfiniteQuery<
    IInfinitePersons,
    Error
  >(
    queryKey(),
    (params: QueryFunctionContext): Promise<IInfinitePersons> => {
      const payload = { size: params?.pageParam?.size ?? 4, offset: params?.pageParam?.offset ?? 0 }
      return getInfinitePersons(payload)
    },
    {
      getNextPageParam: (
        lastPage: IInfinitePersons,
      ): { size: number; offset: number } | undefined => {
        const { count, size, offset, persons } = lastPage
        if (+offset + persons.length >= +count) return
        return {
          size: size,
          offset: offset + 4,
        }
      },
    },
  )

  return infinitePersonsQuery
}
