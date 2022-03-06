import 'styles/globals.css'

import { FC, useState } from 'react'
import { AppProps } from 'next/app'
import { Hydrate, QueryClientProvider, QueryClient, setLogger } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5000,
            refetchOnMount: false, // refetch every time the component is mounted
            refetchOnWindowFocus: false,
            refetchOnReconnect: false, // refetch after connection loss
            retry: false,
          },
        },
      }),
  )

  setLogger({
    log: console.log,
    warn: console.warn,
    error: console.error,
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
