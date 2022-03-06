// libs
import React, { FC } from 'react'
import { useRouter } from 'next/router'
// hooks
import { personsQueryFactory, usePersons } from 'hooks/usePersons'
// components
import Link from 'next/link'
import { PersonCard } from 'components/PersonCard'
// styles
import styles from 'styles/Home.module.css'

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
