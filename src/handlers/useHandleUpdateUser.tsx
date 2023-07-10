import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { UserEntity } from '~/types/entity/user.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

type UpdateUserResponse = {
  data: UserEntity
}

export const useHandleUpdateUser = () => {
  return useMutation(
    async ({ id, data }: { id: string | undefined; data: any }): Promise<UpdateUserResponse> => {
      const { data: resp } = await mainClient.put(`/users/${id}`, data)

      return {
        data: resp.data,
      }
    }
  )
}
