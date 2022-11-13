import { PayloadAction } from '@reduxjs/toolkit'
import { givabitApi } from '~/services/givabit/api'
import { createSlice } from '~/utils/@reduxjs/toolkit'
import { useInjectReducer, useInjectSaga } from '~/utils/redux-injectors'
import { AuthState } from './types'

export const initialState: AuthState = {
  signingIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSigningIn(state, action: PayloadAction<boolean>) {
      state.signingIn = action.payload
    },
    signedIn(state, action: PayloadAction<{ id: string; wallet?: string }>) {
      state.id = action.payload.id
      state.wallet = action.payload.wallet
    },
    signOut(state) {
      state.id = undefined
      state.wallet = undefined
      givabitApi.deleteToken()
    },
  },
})

export const { actions: authActions, reducer } = slice

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer })
  useInjectSaga({ key: slice.name, saga: function* () {} })
  return { actions: slice.actions }
}
