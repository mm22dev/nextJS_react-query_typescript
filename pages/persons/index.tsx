// libs
import React, { FC } from 'react'
// hooks
import { personsQueryFactory, useInfinitePersons } from 'hooks/usePersons'
// components
import Link from 'next/link'
import { PersonCard } from 'components/PersonCard'
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
  } = useInfinitePersons({ queryKey: personsQueryFactory.all })

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
            {persons.map((person) => (
              <PersonCard key={person.id} person={person} />
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
