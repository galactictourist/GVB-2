import { put } from 'redux-saga/effects'
import { testReducer1 } from '../slices/adminSlice'

export function* adminSaga(action: any) {
  console.log('Hello from SAGA')
  yield put(testReducer1())
}
