import { parseCookies } from 'nookies'
import { createSlice } from '~/utils/@reduxjs/toolkit'
import { USER_COOKIES } from '~/utils/constants'

export interface AuthState {
  id?: string
  wallet?: string
}

const cookies = parseCookies()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: cookies[USER_COOKIES.ID] ?? '',
    wallet: cookies[USER_COOKIES.WALLET_ADDRESS] ?? '',
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
