import { setCookie } from 'nookies'
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
      setCookie(null, USER_COOKIES.JWT, resp.data.accessToken, { maxAge: 8640 })

      return {
        id,
        wallet,
      }
    },
    {
      onSuccess: async () => {
        toast.success('Verify signature succeded')
      },
      onError: (e: Error) => {
        toast.error(e.message)
        console.log('Verify signature failed', e)
      },
    }
  )
}
