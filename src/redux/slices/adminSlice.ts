import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface AdminState {
  value: string
}

const initialState: AdminState = {
  value: 'hej',
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    start(state) {
      state.value = 'I am just testing this'
      console.log('TEST33333')
    },
    test1(state, action) {
      state.value = action.payload
      console.log('TEST')
    },
    testReducer1(state, action) {
      state.value = 'Kaffe'
      console.log('TEST2')
    },
  },
})

export const { start, test1, testReducer1 } = adminSlice.actions
export default adminSlice.reducer

// export const { actions: adminActions, reducer } = adminSlice

// export const useAdminSlice = () => {
//   useInjectReducer({ key: adminSlice.name, reducer: adminSlice.reducer })
//   useInjectSaga({ key: adminSlice.name, saga: function* () {} })
//   return { actions: adminSlice.actions }
// }
