import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { injectedConnector } from '~/config'
import { givabitApi } from '~/services/givabit/api'
import { signMessage } from '~/utils/web3'
import { useAuthSlice } from './slice'
import { selectAuth } from './slice/selectors'

export const Auth = () => {
  const { actions } = useAuthSlice()
  const dispatch = useDispatch()
  const { signingIn } = useSelector(selectAuth)
  const { account, connector, activate } = useWeb3React()

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
          if (!connector || !account) {
            await activate(injectedConnector, undefined, true)
          } else {
            const nonce = await givabitApi.getNonce(account)
            const signResponse = await signMessage(connector, nonce, account)
            const loginInfo = await givabitApi.loginUsingWallet(account, signResponse)
            dispatch(actions.signedIn(loginInfo.user))
            dispatch(actions.setSigningIn(false))
          }
        } catch (e) {
          dispatch(actions.setSigningIn(false))
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signingIn, connector, account])

  return <></>
}
