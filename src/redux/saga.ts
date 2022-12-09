import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga, createTopicsSaga, updateTopicsSaga } from './sagas/adminSaga'
import { generateNonceSaga, verifySignatureSaga } from './sagas/authSaga'
import { createCollectionSaga, getCollectionsSaga } from './sagas/collectionsSagas'
import { getTopicByIDSaga, getTopicsSaga } from './sagas/topicsSaga'

import { createTopic, login, updateTopic } from './slices/adminSlice'
import { generateNonce, verifySignature } from './slices/authSlice'
import { createCollection, getCollections } from './slices/collectionsSlice'
import { getTopicById, getTopics } from './slices/topicsSlice'

function* rootSaga() {
  yield all([
    takeLatest(login.type, adminSaga),
    takeLatest(createTopic.type, createTopicsSaga),
    takeLatest(getCollections.type, getCollectionsSaga),
    takeLatest(getTopics.type, getTopicsSaga),
    takeLatest(getTopicById.type, getTopicByIDSaga),
    takeLatest(updateTopic.type, updateTopicsSaga),
    takeLatest(generateNonce.type, generateNonceSaga),
    takeLatest(verifySignature.type, verifySignatureSaga),
    takeLatest(createCollection.type, createCollectionSaga),
  ])
}

export default rootSaga
