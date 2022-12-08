import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface AuthState {
  id?: string
  wallet?: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    wallet: '',
    nonce: '',
    error: '',
  },
  reducers: {
    /**
     * getCollections
     */
    generateNonce(state, action) {
      state.loading = true
      //state.wallet = action.payload.wallet
      console.log('SIGN IN SLICE')
    },
    generateNonceSuccess(state, action) {
      state.loading = false
      //state.wallet = action.payload.wallet
      state.nonce = action.payload
      console.log('SIGN IN SUCCESS')
    },
    generateNonceFailure(state, action) {
      state.loading = false
      console.log('SIGN IN FAIL')
    },
    verifySignature(state, action) {
      state.loading = true
    },
    verifySignatureSuccess(state, action) {
      state.loading = false
      console.log('VERIFY SUCCESS')
    },
    verifySignatureFailure(state, action) {
      state.loading = false
      console.log('VERIFY FAIL')
    },
  },
})

export const {
  generateNonce,
  generateNonceSuccess,
  generateNonceFailure,
  verifySignature,
  verifySignatureSuccess,
  verifySignatureFailure,
} = authSlice.actions
export default authSlice.reducer
