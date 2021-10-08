import { all } from 'redux-saga/effects'

import articleSaga from './article/saga'
import pageSaga from './page/saga'

export default function *rootSaga () {
  yield all([
    articleSaga(),
    pageSaga(),
  ])
}
