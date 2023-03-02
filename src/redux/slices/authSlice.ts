import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface AuthState {
  id?: string
  wallet?: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    wallet: '',
    id: '',
  },
  reducers: {
    /**
     * verifySignature
     */
    verifySignature(state, action) {
      state.id = action.payload.id
      state.wallet = action.payload.wallet
    },
    /**
     * signOut
     */
    signOut(state) {
      state.id = ''
      state.wallet = ''
    },
  },
})

export const { verifySignature, signOut } = authSlice.actions
export default authSlice.reducer
