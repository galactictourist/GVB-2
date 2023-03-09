import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga, createTopicsSaga, updateTopicsSaga } from './sagas/adminSaga'
import { getAllCausesSaga } from './sagas/causesSaga'
import {
  createCollectionSaga,
  getAllCollectionsSaga,
  getMyCollectionsSaga,
  updateCollectionSaga,
} from './sagas/collectionsSagas'
import { createNftSaga } from './sagas/nftSaga'
import { postImageSaga } from './sagas/storageSaga'
import { getTopicByIDSaga, getTopicsSaga } from './sagas/topicsSaga'

import { createTopic, login, updateTopic } from './slices/adminSlice'
import { verifySignature } from './slices/authSlice'
import { getAllCauses } from './slices/causesSlice'
import {
  createCollection,
  getAllCollections,
  getMyCollections,
  updateCollection,
} from './slices/collectionsSlice'
import { createNft } from './slices/nftSlice'
import { postImage } from './slices/storageSlice'
import { getTopicById, getTopics } from './slices/topicsSlice'

function* rootSaga() {
  yield all([
    takeLatest(login.type, adminSaga),
    takeLatest(createTopic.type, createTopicsSaga),
    takeLatest(getAllCauses.type, getAllCausesSaga),
    takeLatest(getAllCollections.type, getAllCollectionsSaga),
    takeLatest(getMyCollections.type, getMyCollectionsSaga),
    takeLatest(createCollection.type, createCollectionSaga),
    takeLatest(updateCollection.type, updateCollectionSaga),
    takeLatest(postImage.type, postImageSaga),
    takeLatest(getTopics.type, getTopicsSaga),
    takeLatest(getTopicById.type, getTopicByIDSaga),
    takeLatest(updateTopic.type, updateTopicsSaga),
    takeLatest(createNft.type, createNftSaga),
    takeLatest(verifySignature.type, verifySignature),
  ])
}

export default rootSaga
