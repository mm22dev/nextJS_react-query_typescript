import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import crypto from 'crypto'

const Home: NextPage = () => {
  const mockPersonId = crypto.randomBytes(8).toString('hex')

  return (
    <div className={styles.container}>
      <Head>
        <title>react-query basics</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://react-query.tanstack.com/'>react-query</a> basics
        </h1>

        <p className={styles.description}>Contents:</p>

        <div className={styles.grid} style={{ cursor: 'pointer' }}>
          <Link href={`./person/${mockPersonId}`}>
            <div className={styles.card}>
              <h2>useQuery &rarr;</h2>
              <p>
                Fetch using <code className={styles.code}>useQuery</code>.
              </p>
            </div>
          </Link>

          <Link href={`./prefetch/person/${mockPersonId}`}>
            <div className={styles.card}>
              <h2>prefetchQuery &rarr;</h2>
              <p>
                Prefetch using <code className={styles.code}>prefetchQuery</code>.
              </p>
            </div>
          </Link>

          <Link href='./persons'>
            <div className={styles.card}>
              <h2>useInfiniteQuery &rarr;</h2>
              <p>
                Make infinite queries using <code className={styles.code}>useInfiniteQuery</code>.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
