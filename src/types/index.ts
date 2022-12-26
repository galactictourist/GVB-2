import { MetaMaskInpageProvider } from '@metamask/providers'
import { RootState } from './RootState'

export type { RootState }

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}
