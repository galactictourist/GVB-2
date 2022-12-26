import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMetaMask } from '~/lib/ethers-react/useMetaMask'
import { useWeb3 } from '~/lib/ethers-react/useWeb3'
import { givabitApi } from '~/services/givabit/api'
import { signMessageEthers } from '~/utils/web3'
import { useAuthSlice } from './slice'
import { selectAuth } from './slice/selectors'

export const Auth = () => {
  const { actions } = useAuthSlice()
  const dispatch = useDispatch()
  const { signingIn } = useSelector(selectAuth)

  const {
    isInstalledWallet, // Determine whether the wallet is installed
    isConnected, // Determine whether the wallet is connected
    connectedAccount, // Metamask current connected account
    connectWallect, // Connect metamask function
  } = useMetaMask()
  const { web3Provider } = useWeb3()

  useEffect(() => {
    ;(async () => {
      if (givabitApi.isSignedIn()) {
        try {
          const userInformation = await givabitApi.getMe()
          dispatch(actions.signedIn(userInformation))
        } catch (e) {
          dispatch(actions.signOut())
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async () => {
      if (signingIn) {
        try {
          if (!connectedAccount) {
            const result = await connectWallect()
            if (!result) {
              dispatch(actions.setSigningIn(false))
            }
          } else {
            const nonce = await givabitApi.getNonce(connectedAccount)
            const signResponse = await signMessageEthers(web3Provider, nonce, connectedAccount)
            const loginInfo = await givabitApi.loginUsingWallet(connectedAccount, signResponse)
            dispatch(actions.signedIn(loginInfo.user))
            dispatch(actions.setSigningIn(false))
          }
        } catch (e) {
          dispatch(actions.setSigningIn(false))
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signingIn, connectedAccount, web3Provider])

  return <></>
}
