import { useWeb3React } from '@web3-react/core'
import { injectedConnector } from '~/config'

import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { generateNonce } from '~/redux/slices/authSlice'
import { RootState } from '~/redux/store'
//import { signMessage } from '../../utils/web3'

interface Props {
  width?: string
  loading?: boolean
  padding?: string
  noIcon?: boolean
}

export const MetaMaskButton = ({ width, padding, noIcon }: Props) => {
  const dispatch = useDispatch()
  const title = 'Login'
  const { account, connector, activate } = useWeb3React()

  const { loading, nonce } = useSelector((state: RootState) => state.auth)

  console.log('HEJ')
  console.log(account)
  console.log(connector)

  const successMessage = () => {
    toast.success('Tried to sign in', {
      position: 'bottom-center',
    })
  }

  function onClick() {
    if (false) {
      console.log('SIGNING OUT')
    } else {
      ;(async () => {
        console.log('HEJHEJHEJ')
        try {
          await activate(injectedConnector, undefined, true)
          console.log('METAMASK SUCCESS - MAYBE')
        } catch (error) {
          console.log(error)
        }
      })()
      ;async () => {
        if (account) {
          dispatch(
            generateNonce({
              wallet: account,
            })
          )
        }
        // Signing the message with Metamask
        //const signResponse = await signMessage(connector, nonce, account)

        console.log(account)
        console.log('CONNECTOR')
        console.log(connector)

        successMessage()
      }
      // Getting Nonce if Metamask is connected
    }
  }
  useEffect(() => {}, [connector, account])

  // useEffect(() => {
  //   ;(async () => {
  //     if (signingIn) {
  //       try {
  //         if (!connector || !account) {
  //           await activate(injectedConnector, undefined, true)
  //         } else {
  //           const nonce = await authApi.getNonce(account)
  //           const signResponse = await signMessage(connector, nonce, account)
  //           const loginInfo = await authApi.loginUsingWallet(account, signResponse)
  //           dispatch(actions.signedIn(loginInfo.user))
  //           dispatch(actions.setSigningIn(false))
  //         }
  //       } catch (e) {
  //         dispatch(actions.setSigningIn(false))
  //       }
  //     }
  //   })()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signingIn, connector, account])

  return (
    <button
      className={`ease group relative z-30 box-border inline-flex ${
        width ? width : 'w-auto'
      } ${padding} cursor-pointer items-center justify-center overflow-hidden rounded bg-indigo-600 bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3 font-bold text-white transition-all duration-300 focus:outline-none`}
      onClick={onClick}
    >
      <span className="absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>
      <span className="absolute top-0 left-0 -mt-1 -ml-12 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>

      <span className="relative z-20 flex items-center font-semibold">
        {noIcon && (
          <svg
            className="relative mr-2 h-5 w-5 flex-shrink-0 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        )}
        {loading ? 'Loading...' : title}
      </span>
    </button>
  )
}

export default MetaMaskButton
