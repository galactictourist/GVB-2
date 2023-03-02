import { ReactNode } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygon, polygonMumbai } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'

export type Props = {
  children: ReactNode
}

const { chains, provider } = configureChains([polygon, polygonMumbai], [publicProvider()])
const injectedConnector = new InjectedConnector({ chains })
export const metamaskConnector = new MetaMaskConnector({ chains })
const connectors = [injectedConnector, metamaskConnector]

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export const Web3ContextProvider = ({ children }: Props) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>
}
