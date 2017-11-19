import { all } from 'redux-saga/effects'

import pageSaga from '../containers/PageContainer/saga'
import siteInfoSaga from '../containers/SiteInfoContainer/saga'

export default function *rootSaga () {
  yield all([
    pageSaga(),
    siteInfoSaga()
  ])
}