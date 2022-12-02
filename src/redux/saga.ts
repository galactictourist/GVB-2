import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga, createTopicsSaga } from './sagas/adminSaga'
import { getCollectionsSaga } from './sagas/collectionsSagas'
import { getTopicsSaga } from './sagas/topicsSaga'

import { createTopic, login } from './slices/adminSlice'
import { getCollections } from './slices/collectionsSlice'
import { getTopics } from './slices/topicsSlice'

function* rootSaga() {
  yield all([
    takeLatest(login.type, adminSaga),
    takeLatest(createTopic, createTopicsSaga),
    takeLatest(getCollections.type, getCollectionsSaga),
    takeLatest(getTopics.type, getTopicsSaga),
  ])
}

export default rootSaga
