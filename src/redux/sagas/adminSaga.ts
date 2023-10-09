import Cookies from 'js-cookie'
import { call, put } from 'redux-saga/effects'
import { adminApi } from '~/pages/api/admin.api'
import { COOKIES } from '../../utils/constants'
import {
  createCharityFailure,
  createCharitySuccess,
  createTopicFailure,
  createTopicSuccess,
  loginFailure,
  loginSuccess,
  updateCharityFailure,
  updateCharitySuccess,
  updateTopicFailure,
  updateTopicSuccess
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
    yield call(Cookies.remove, COOKIES.JWT)
  } catch (error) {
    console.log(error)
  }
}

export function* createTopicsSaga(action: any) {
  try {
    const { data } = yield call(adminApi.createInterest, 'topics', action.payload)
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
    const { data } = yield call(adminApi.updateInterest, id, 'topics', payload)
    if (data) {
      yield put(updateTopicSuccess(data))
    }
  } catch (error) {
    console.log('ADMIN SAGA UPDATE TOPIC FAILURE')
    console.log(error)
    yield put(updateTopicFailure(error))
  }
}

export function* createCharitySaga(action: any) {
  try {
    const { data } = yield call(adminApi.createInterest, 'charities', action.payload)
    if (data) {
      yield put(createCharitySuccess(data))
    }
  } catch (error) {
    console.log('ADMIN SAGA CREATE CHARITY FAILURE')
    console.log(error)
    yield put(createCharityFailure(error))
  }
}

export function* updateCharitySaga(action: any) {
  try {
    const { id, payload } = action.payload
    const { data } = yield call(adminApi.updateInterest, id, 'charities', payload)
    if (data) {
      yield put(updateCharitySuccess(data))
    }
  } catch (error) {
    console.log('ADMIN SAGA UPDATE CHARITY FAILURE')
    console.log(error)
    yield put(updateCharityFailure(error))
  }
}
