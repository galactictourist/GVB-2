import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga } from './sagas/adminSaga'
import { getCollectionsSaga } from './sagas/collectionsSagas'

import { login } from './slices/adminSlice'
import { getCollections } from './slices/collectionsSlice'

function* rootSaga() {
  yield all([
    takeLatest(login.type, adminSaga),
    takeLatest(getCollections.type, getCollectionsSaga),
  ])
}

export default rootSaga
