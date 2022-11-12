import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { givabitApi } from '~/services/givabit/api'
import { useAuthSlice } from './slice'

export const Auth = () => {
  const { actions } = useAuthSlice()
  const dispatch = useDispatch()
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

  return <></>
}
