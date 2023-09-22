import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const useHandleSaleStatus = () => {
  return useMutation(
    async ({ nftId, actionStatus }: { nftId: string; actionStatus: string }): Promise<boolean> => {
      const { data: resp } = await mainClient.post('/sales/check/tx_status', {
        nftId,
        actionStatus,
      })

      return resp.data
    }
  )
}
