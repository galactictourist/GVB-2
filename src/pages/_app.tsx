//import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import nProgress from 'nprogress'
import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

import Router from 'next/router'
import 'nprogress/nprogress.css'
import { Web3ContextProvider } from '~/providers/Web3ContextProvider'
import { store } from '~/redux/store'
import '../styles/globals.css'

// @ts-ignore
React.useLayoutEffect = useIsomorphicLayoutEffect

nProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
})

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Web3ContextProvider>
            <React.StrictMode>
              <Toaster />
              <Component {...pageProps} />
            </React.StrictMode>
          </Web3ContextProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
