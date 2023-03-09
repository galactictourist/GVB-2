import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface ICause {
  id: string
  name: string
}

const causesSlice = createSlice({
  name: 'causes',
  initialState: {
    loading: false,
    causes: [] as ICause[],
    error: '',
  },
  reducers: {
    /**
     * getAllCauses
     */
    getAllCauses(state) {
      state.loading = true
    },
    getAllCausesSuccess(state, action) {
      state.loading = false
      state.causes = action.payload
      state.error = ''
    },
    getAllCausesFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const { getAllCauses, getAllCausesSuccess, getAllCausesFailure } = causesSlice.actions
export default causesSlice.reducer
