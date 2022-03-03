// libs
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'
// components
import Link from 'next/link'
import { PersonCard } from 'components/PersonCard'
// requests
import { getPersonById } from 'queries/persons'
// types
import { GetServerSideProps } from 'next'
import { IPerson } from 'lib/interfaces/IPerson'
import { DehydratedState, UseQueryResult } from 'react-query'
// styles
import styles from 'styles/Home.module.css'

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<{ props: { dehydratedState: DehydratedState } }> => {
  const queryClient = new QueryClient()
  const id = context?.params?.id

  await queryClient.prefetchQuery(['person', id], () => getPersonById(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const PersonPage: FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { isLoading, isError, error, data }: UseQueryResult<IPerson, Error> = useQuery<
    IPerson,
    Error
  >(['person', id], () => getPersonById(id), {
    enabled: !!id, // enabled will stop a query from running, so will only call when id is available
    refetchOnMount: false, // refetch every time the component is mounted
    refetchOnWindowFocus: false,
    refetchOnReconnect: false, // refetch after connection loss
    retry: false,
  })

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (isError) return <p>Error: {error?.message}</p>

  return (
    <div>
      <header>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </header>
      <div className={styles.main}>{data && <PersonCard person={data} />}</div>
    </div>
  )
}

export default PersonPage
