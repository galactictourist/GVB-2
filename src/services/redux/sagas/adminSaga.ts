import Cookies from 'js-cookie'
import { call, put } from 'redux-saga/effects'
import { adminApi } from '~/pages/api/admin.api'
import { COOKIES } from '~/utils/constants'
import {
  createTopicFailure,
  createTopicSuccess,
  loginFailure,
  loginSuccess,
  updateTopicFailure,
  updateTopicSuccess,
} from '../slices/adminSlice'

export function* adminLoginSaga(action: any) {
  try {
    const { data } = yield call(adminApi.login, action.payload)
    if (data) {
      yield call(Cookies.set, COOKIES.JWT, data.accessToken, { expires: 8640 })
      yield put(loginSuccess(data))
    }
  } catch (error) {
    console.log(error)
    yield put(loginFailure(error))
  }
}

export function* adminLogoutSaga(action: any) {
  try {
    yield call(Cookies.remove, COOKIES.JWT, { path: '' })
  } catch (error) {
    console.log(error)
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
