import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga } from './sagas/adminSaga'

import { login } from './slices/adminSlice'

function* rootSaga() {
  yield all([takeLatest(login.type, adminSaga)])
}

export default rootSaga
