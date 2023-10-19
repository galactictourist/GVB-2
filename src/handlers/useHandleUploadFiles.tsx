import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { StorageEntity } from '~/types/entity/storage.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const useHandleUploadFiles = () => {
  return useMutation(
    async (files: any): Promise<StorageEntity[]> => {
      mainClient.defaults.headers['Content-Type'] = 'multipart/form-data'
      const { data: resp } = await mainClient.post('storage/nft/images', {
        files
      })
      return resp.data
    }
  )
}
