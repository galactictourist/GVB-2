import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface AdminState {}

const initialState: AdminState = {}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    test1(state) {},
    testReducer1(state) {},
  },
})

export const { test1, testReducer1 } = adminSlice.actions
export default adminSlice.reducer

// export const { actions: adminActions, reducer } = adminSlice

// export const useAdminSlice = () => {
//   useInjectReducer({ key: adminSlice.name, reducer: adminSlice.reducer })
//   useInjectSaga({ key: adminSlice.name, saga: function* () {} })
//   return { actions: adminSlice.actions }
// }
