import detectEthereumProvider from '@metamask/detect-provider'
import { useEffect, useState } from 'react'

export const useMetaMask = () => {
  // is installed wallet
  const [isInstalledWallet, setIsInstalledWallet] = useState<boolean>(false)
  // is connected wallet
  const [isConnected, setIsConnected] = useState<boolean>(false)
  // connected accounts
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null)

  // check wallet is installed
  const checkIfWalletIsInstalled = async () => {
    let flag: boolean = false
    const provider = await detectEthereumProvider()
    if (provider) {
      if (provider !== window.ethereum) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        console.error('Do you have multiple wallets installed?')
      } else {
        flag = true
      }
    }
    setIsInstalledWallet(flag)
    return flag
  }

  // monitor accounts change
  const onChangeAccounts = async () => {
    try {
      if (!isInstalledWallet) {
        return false
      }
      window.ethereum?.on('accountsChanged', (...args: unknown[]) => {
        const accounts = args[0] as string[]
        if (accounts && accounts.length) {
          setConnectedAccount(accounts[0])
        } else {
          setConnectedAccount(null)
        }
      })
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object.')
    }
  }

  // monitor chain change
  const onChangeChain = async () => {
    try {
      if (!isInstalledWallet) {
        return false
      }
      window.ethereum?.on('chainChanged', (...args: unknown[]) => {
        const chainId = args[0] as string
        console.log('chainChanged:', parseInt(chainId))
        // window.location.reload()
      })
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object.')
    }
  }

  // check wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!isInstalledWallet) {
        return false
      }
      const accounts = (await window.ethereum?.request({
        method: 'eth_accounts',
      })) as string[]
      if (accounts && accounts.length) {
        setConnectedAccount(accounts[0])
      } else {
        setConnectedAccount(null)
        console.log('No accounts found')
      }
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object.')
    }
  }

  // connect wallect
  const connectWallet = async () => {
    try {
      if (!isInstalledWallet) {
        return false
      }
      const accounts = (await window.ethereum?.request({
        method: 'eth_requestAccounts',
      })) as string[]
      if (accounts && accounts.length) {
        setConnectedAccount(accounts[0])
        return true
      }
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object.')
    }
  }

  useEffect(() => {
    checkIfWalletIsInstalled()
  }, [])

  useEffect(() => {
    checkIfWalletIsConnected()
    onChangeAccounts()
    onChangeChain()
  }, [isInstalledWallet])

  return {
    isInstalledWallet,
    isConnected,
    connectedAccount,
    checkIfWalletIsInstalled,
    checkIfWalletIsConnected,
    connectWallet,
  }
}
