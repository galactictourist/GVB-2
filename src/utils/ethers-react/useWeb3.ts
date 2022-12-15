import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMetaMask } from './useMetaMask'

export const useWeb3 = () => {
  const { connectedAccount } = useMetaMask()
  const [balance, setBalance] = useState<string | number>(0)
  const [provider, setProvider] = useState<any>(null)

  // get provider
  const getProvider = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as unknown as ethers.providers.ExternalProvider
    )
    setProvider(provider)
  }

  // get balance
  const getBalance = async () => {
    const balance = await provider.getBalance(connectedAccount)
    setBalance(ethers.utils.formatEther(balance))
  }

  useEffect(() => {
    getProvider()
  }, [])

  useEffect(() => {
    connectedAccount && provider && getBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, provider])

  return {
    balance,
    web3Provider: provider,
  }
}
