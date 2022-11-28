import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '~/utils/@reduxjs/toolkit'
import { useInjectReducer, useInjectSaga } from '~/utils/redux-injectors'
import { AdminState } from '../types'

export const initialState: AdminState = {
  signingIn: false,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSigningIn(state, action: PayloadAction<boolean>) {
      state.signingIn = action.payload
    },
    signedIn(state, action: PayloadAction<{ id: string; wallet?: string }>) {},
    signOut(state) {},
  },
})

export const { actions: userActions, reducer } = adminSlice

export const useAuthSlice = () => {
  useInjectReducer({ key: adminSlice.name, reducer: adminSlice.reducer })
  useInjectSaga({ key: adminSlice.name, saga: function* () {} })
  return { actions: adminSlice.actions }
}
