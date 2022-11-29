import { createSlice } from '~/utils/@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: false,
    id: '',
    role: '',
    status: '',
    username: '',
    error: '',
  },
  reducers: {
    login(state, action) {
      state.loading = true
    },
    loginSuccess(state, action) {
      const { user } = action.payload
      const { id, role, status, username } = user
      state.id = id
      state.role = role
      state.status = status
      state.username = username
      state.error = ''
      state.loading = false
    },
    loginFailure(state, action) {
      state.loading = false
      state.id = ''
      state.role = ''
      state.status = ''
      state.username = ''
      state.error = action.payload.message
    },
  },
})

export const { login, loginSuccess, loginFailure } = adminSlice.actions
export default adminSlice.reducer
