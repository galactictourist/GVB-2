import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { UserEntity } from '~/types/entity/user.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type UserResp = UserEntity

export const useProfile = ({ id }: { id: string | undefined }) => {
  return useQuery<UserResp>(
    [`user-${id}`],
    async () => {
      const { data: resp } = await mainClient.get(`/users/${id}`)
      return resp.data ? resp.data : null
    },
    {
      enabled: !(!id || id.length === 0),
    }
  )
}
