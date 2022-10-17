import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as React from 'react'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { configureAppStore } from '../store/configureStore'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider: any) {
  console.log('provider', provider)
  return new Web3(provider)
}

const store = configureAppStore()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <React.StrictMode>
            <Component {...pageProps} />
          </React.StrictMode>
        </Web3ReactProvider>
      </HelmetProvider>
    </Provider>
  )
}

export default MyApp
