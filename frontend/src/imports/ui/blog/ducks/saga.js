import { all } from 'redux-saga/effects'

import articleSaga from './article/saga'
export default function *rootSaga () {
  yield all([
    articleSaga(),
  ])
}
