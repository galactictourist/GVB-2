import { AbstractConnector } from '@web3-react/abstract-connector'
import Web3 from 'web3'

export async function signMessage(connector: AbstractConnector, message: string, account: string) {
  const provider = await connector.getProvider()
  const web3 = new Web3(provider)
  const signResponse = await web3.eth.personal.sign(web3.utils.fromUtf8(message), account, '')
  return signResponse
}
