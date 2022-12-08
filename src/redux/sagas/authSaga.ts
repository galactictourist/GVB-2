import { setCookie } from 'nookies'
import { call, put } from 'redux-saga/effects'
import { authApi } from '~/pages/api/auth.api'
import { USER_COOKIES } from '../../utils/constants'
import {
  generateNonceFailure,
  generateNonceSuccess,
  verifySignatureFailure,
  verifySignatureSuccess,
} from '../slices/authSlice'

export function* generateNonceSaga(action: any) {
  try {
    const { data } = yield call(authApi.generateNonce, action.payload)
    if (data) {
      //yield call(setCookie, null, COOKIES.JWT, data.accessToken, { maxAge: 8640 })
      console.log('NONCE SUCCESS')
      console.log(data)
      yield put(generateNonceSuccess(data.message))
    }
  } catch (error) {
    console.log('NONCE ERROR')
    console.log(error)
    yield put(generateNonceFailure(error))
  }
}

export function* verifySignatureSaga(action: any) {
  try {
    const { data } = yield call(authApi.verifySignature, action.payload)
    if (data) {
      yield call(setCookie, null, USER_COOKIES.JWT, data.token, { maxAge: 8640 })
      yield put(verifySignatureSuccess(data.user))
    }
  } catch (error) {
    yield put(verifySignatureFailure(error))
  }
}
