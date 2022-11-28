import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga } from './sagas/adminSaga'

import { test1 } from './slices/adminSlice'

function* rootSaga() {
  yield all([takeLatest(test1.type, adminSaga)])
}

export default rootSaga
