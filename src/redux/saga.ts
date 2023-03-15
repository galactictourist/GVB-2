import { all, takeLatest } from 'redux-saga/effects'

import { adminSaga, createTopicsSaga, updateTopicsSaga } from './sagas/adminSaga'
import { postImageSaga } from './sagas/storageSaga'
import { getTopicByIDSaga, getTopicsSaga } from './sagas/topicsSaga'

import { createTopic, login, updateTopic } from './slices/adminSlice'
import { verifySignature } from './slices/authSlice'
import { postImage } from './slices/storageSlice'
import { getTopicById, getTopics } from './slices/topicsSlice'

function* rootSaga() {
  yield all([
    takeLatest(login.type, adminSaga),
    takeLatest(createTopic.type, createTopicsSaga),
    takeLatest(postImage.type, postImageSaga),
    takeLatest(getTopics.type, getTopicsSaga),
    takeLatest(getTopicById.type, getTopicByIDSaga),
    takeLatest(updateTopic.type, updateTopicsSaga),
    takeLatest(verifySignature.type, verifySignature),
  ])
}

export default rootSaga
