// libs
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
// hooks
import { personsQueryFactory, usePersons } from 'hooks/usePersons'
// components
import Link from 'next/link'
import { PersonCard } from 'components/PersonCard'
// requests
import { getPersonById } from 'queries/persons'
// types
import { GetServerSideProps } from 'next'
import { DehydratedState } from 'react-query'
// styles
import styles from 'styles/Home.module.css'

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<{ props: { dehydratedState: DehydratedState } }> => {
  const queryClient = new QueryClient()
  const id = context.params?.id

  if (id && typeof id === 'string') {
    await queryClient.prefetchQuery(personsQueryFactory.infos(id), () => getPersonById(id))
  }

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

  const personId = typeof id === 'string' ? id : undefined
  const { isLoading, isError, error, data } = usePersons({
    queryKey: personsQueryFactory.infos,
    personId,
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
