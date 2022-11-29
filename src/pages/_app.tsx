import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import Web3 from 'web3'
//import { Auth } from '~/components/Auth/Auth'
//import { configureAppStore } from '../store/configureStore'
import { store } from '~/redux/store'
import '../styles/globals.css'

// @ts-ignore
React.useLayoutEffect = useIsomorphicLayoutEffect

function getLibrary(provider: any) {
  return new Web3(provider)
}

//const store = configureAppStore()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <React.StrictMode>
            {/* <Auth /> */}
            <Toaster />
            <Component {...pageProps} />
          </React.StrictMode>
        </Web3ReactProvider>
      </HelmetProvider>
    </Provider>
  )
}

export default MyApp
