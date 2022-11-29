import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga } from './sagas/adminSaga'

import { start } from './slices/adminSlice'

function* rootSaga() {
  yield all([takeLatest(start.type, adminSaga)])
}

export default rootSaga
