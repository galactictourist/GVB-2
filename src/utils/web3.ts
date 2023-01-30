import { ethers } from 'ethers'
import { TypedData } from '~/types/web3'

// export async function signMessage(connector: AbstractConnector, message: string, account: string) {
//   const provider = await connector.getProvider()
//   const web3 = new Web3(provider)
//   const signResponse = await web3.eth.personal.sign(web3.utils.fromUtf8(message), account, '')
//   return signResponse
// }

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
  typedData: TypedData<any>,
  account: string
) {
  const signer = provider.getSigner(account)
  const signResponse = await signer._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.message
  )
  return signResponse
}
