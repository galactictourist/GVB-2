import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { USER_COOKIES } from '~/utils/constants'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

type VerifySignatureResponse = {
  id: string
  wallet: string
}

export const useHandleVerifySignature = () => {
  return useMutation(
    async ({
      address,
      signature,
    }: {
      address: string
      signature: string
    }): Promise<VerifySignatureResponse> => {
      const { data: resp } = await mainClient.post('/auth/signin/wallet', {
        wallet: address,
        signature,
      })

      const id = resp.data.user.id
      const wallet = resp.data.user.wallet
      const accessToken = resp.data.accessToken

      Cookies.set(USER_COOKIES.ID, id, { expires: 8640 })
      Cookies.set(USER_COOKIES.WALLET_ADDRESS, wallet, { expires: 8640 })
      Cookies.set(USER_COOKIES.JWT, accessToken, { expires: 8640 })

      return {
        id,
        wallet,
      }
    },
    {
      onSuccess: async () => {
        toast.success('Wallet login succeded')
      },
      onError: (e: Error) => {
        toast.error(e.message)
        console.log('Wallet login failed', e)
      },
    }
  )
}
