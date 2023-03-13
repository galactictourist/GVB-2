import { setCookie } from 'nookies'
import { call, put } from 'redux-saga/effects'
import { adminApi } from '~/pages/api/admin.api'
import { COOKIES } from '../../utils/constants'
import {
  createTopicFailure,
  createTopicSuccess,
  loginFailure,
  loginSuccess,
  updateTopicFailure,
  updateTopicSuccess
} from '../slices/adminSlice'

export function* adminSaga(action: any) {
  try {
    const { data } = yield call(adminApi.login, action.payload)
    if (data) {
      yield call(setCookie, null, COOKIES.JWT, data.accessToken, { maxAge: 8640 })
      yield put(loginSuccess(data))
    }
  } catch (error) {
    console.log(error)
    yield put(loginFailure(error))
  }
}

export function* createTopicsSaga(action: any) {
  try {
    const { data } = yield call(adminApi.createTopic, action.payload)
    if (data) {
      yield put(createTopicSuccess(data))
    }
  } catch (error) {
    console.log('ADMIN SAGA CREATE TOPIC FAILURE')
    console.log(error)
    yield put(createTopicFailure(error))
  }
}

export function* updateTopicsSaga(action: any) {
  try {
    const { id, payload } = action.payload
    const { data } = yield call(adminApi.updateTopic, id, payload)
    if (data) {
      yield put(updateTopicSuccess(data))
    }
  } catch (error) {
    console.log('ADMIN SAGA UPDATE TOPIC FAILURE')
    console.log(error)
    yield put(updateTopicFailure(error))
  }
}
