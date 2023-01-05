import { AbstractConnector } from '@web3-react/abstract-connector'
import { ethers } from 'ethers'
import Web3 from 'web3'

export async function signMessage(connector: AbstractConnector, message: string, account: string) {
  const provider = await connector.getProvider()
  const web3 = new Web3(provider)
  const signResponse = await web3.eth.personal.sign(web3.utils.fromUtf8(message), account, '')
  return signResponse
}

export async function signMessageEthers(
  provider: ethers.providers.Web3Provider,
  message: string,
  account: string
) {
  const signer = provider.getSigner(account)
  const signResponse = await signer.signMessage(message)
  return signResponse
}

export async function signTypedData(
  provider: ethers.providers.Web3Provider,
  typedData: any,
  account: string
) {
  const signer = provider.getSigner(account)
  const signResponse = await signer._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value
  )
  return signResponse
}
