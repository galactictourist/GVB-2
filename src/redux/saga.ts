import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga, createTopicsSaga, updateTopicsSaga } from './sagas/adminSaga'
import { generateNonceSaga, verifySignatureSaga } from './sagas/authSaga'
import {
  createCollectionSaga,
  getAllCollectionsSaga,
  getMyCollectionsSaga,
  updateCollectionSaga,
} from './sagas/collectionsSagas'
import { getTopicByIDSaga, getTopicsSaga } from './sagas/topicsSaga'

import { createTopic, login, updateTopic } from './slices/adminSlice'
import { generateNonce, verifySignature } from './slices/authSlice'
import {
  createCollection,
  getAllCollections,
  getMyCollections,
  updateCollection,
} from './slices/collectionsSlice'
import { getTopicById, getTopics } from './slices/topicsSlice'

function* rootSaga() {
  yield all([
    takeLatest(login.type, adminSaga),
    takeLatest(createTopic.type, createTopicsSaga),
    takeLatest(getAllCollections.type, getAllCollectionsSaga),
    takeLatest(getMyCollections.type, getMyCollectionsSaga),
    takeLatest(createCollection.type, createCollectionSaga),
    takeLatest(updateCollection.type, updateCollectionSaga),
    takeLatest(getTopics.type, getTopicsSaga),
    takeLatest(getTopicById.type, getTopicByIDSaga),
    takeLatest(updateTopic.type, updateTopicsSaga),
    takeLatest(generateNonce.type, generateNonceSaga),
    takeLatest(verifySignature.type, verifySignatureSaga),
  ])
}

export default rootSaga
