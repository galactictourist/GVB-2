import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

type CreateNonceResponse = {
  nonce: string
}

export const useHandleCreateNonce = () => {
  return useMutation(
    async ({ address }: { address: string }): Promise<CreateNonceResponse> => {
      const { data: resp } = await mainClient.post('/auth/signin/wallet/nonce', {
        wallet: address,
      })

      return {
        nonce: resp.data.message,
      }
    },
    {
      onSuccess: async () => {
        console.log('Nonce creation succeded')
      },
      onError: (e: Error) => {
        toast.error(e.message)
        console.log('Nonce creation failed', e)
      },
    }
  )
}
