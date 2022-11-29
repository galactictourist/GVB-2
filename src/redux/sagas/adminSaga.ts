import { call, put } from 'redux-saga/effects'
import { adminApi } from '~/pages/api/admin.api'
import { loginFailure, loginSuccess } from '../slices/adminSlice'

export function* adminSaga(action: any) {
  console.log('Hello from saga')
  console.log(action)
  try {
    const { data } = yield call(adminApi.login, action.payload)
    if (data) {
      console.log(data)
      yield put(loginSuccess(data))
    }
  } catch (error) {
    console.log(error)
    yield put(loginFailure(error))
  }
}
