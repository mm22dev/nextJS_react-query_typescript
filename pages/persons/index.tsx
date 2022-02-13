// libs
import React, { FC } from 'react'
import { useInfiniteQuery } from 'react-query'
// components
import Link from 'next/link'
import { PersonCard } from 'components/PersonCard'
// requests
import { getInfinitePersons } from 'queries/persons'
// types
import { IInfinitePersons } from 'lib/interfaces/IPerson'
import { UseInfiniteQueryResult, QueryFunctionContext } from 'react-query'
// styles
import styles from 'styles/Home.module.css'

const PersonPage: FC = () => {
  const {
    isLoading,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  }: UseInfiniteQueryResult<IInfinitePersons, Error> = useInfiniteQuery<IInfinitePersons, Error>(
    'persons',
    (params: QueryFunctionContext): Promise<IInfinitePersons> => {
      // The first time this function is called, his argument has undefined pageParam
      // each time the getNextPageParamv is called
      const payload = { size: params?.pageParam?.size ?? 4, offset: params?.pageParam?.offset ?? 0 }
      return getInfinitePersons(payload)
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      getNextPageParam: (
        lastPage: IInfinitePersons,
      ): { size: number; offset: number } | undefined => {
        const { count, size, offset, persons } = lastPage
        // set hasNextPage to false if are there no more data to fetch
        if (offset + persons.length >= count) return
        // otherwise send the parameters to the query function to fetch the next bunch of data
        return {
          size: size,
          offset: offset + 4,
        }
      },
    },
  )

  if (isError) return <p>Error: {error?.message}</p>

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )

  return (
    <div>
      <header>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </header>
      <div className={styles.main}>
        {data?.pages?.map(({ persons }, key) => (
          <div key={key}>
            {persons.map(({ id, age, name }) => (
              <PersonCard id={id} name={name} age={age} key={id} />
            ))}
          </div>
        ))}
        <div>
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? 'Loading more...' : 'Load More'}
            </button>
          )}
        </div>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </div>
    </div>
  )
}

export default PersonPage
