import { setCookie } from 'nookies'
import { call, put } from 'redux-saga/effects'
import { adminApi } from '~/pages/api/admin.api'
import { COOKIES } from '../../utils/constants'
import {
  createTopicFailure,
  createTopicSuccess,
  loginFailure,
  loginSuccess,
} from '../slices/adminSlice'

export function* adminSaga(action: any) {
  console.log('Hello from saga')
  console.log(action)
  try {
    const { data } = yield call(adminApi.login, action.payload)
    if (data) {
      console.log(data)
      yield call(setCookie, null, COOKIES.JWT, data.accessToken, { maxAge: 8640 })
      yield put(loginSuccess(data))
    }
  } catch (error) {
    console.log(error)

    yield put(loginFailure(error))
  }
}

export function* createTopicsSaga(action: any) {
  console.log('Hello from admin saga')
  try {
    const { data } = yield call(adminApi.createTopic, action.payload)
    if (data) {
      console.log('ADMIN SAGA CREATE TOPIC SUCCESS')
      console.log(data)
      yield put(createTopicSuccess(data))
    }
  } catch (error) {
    console.log('ADMIN SAGA CREATE TOPIC FAILURE')
    console.log(error)
    yield put(createTopicFailure(error))
  }
}
