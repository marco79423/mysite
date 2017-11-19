import { all } from 'redux-saga/effects'

import articleSaga from './ducks/article/saga'
import pageSaga from './ducks/page/saga'
import siteInfoSaga from './ducks/site-info/saga'

export default function *rootSaga () {
  yield all([
    articleSaga(),
    pageSaga(),
    siteInfoSaga()
  ])
}