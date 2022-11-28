import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '~/types'
import { initialState } from './slices/authSlice'

// First select the relevant part from the state
const selectSlice = (state: RootState) => state?.auth || initialState

export const selectAuth = createSelector([selectSlice], (state) => state)
