import { all } from 'redux-saga/effects'

import pageSaga from '../ducks/page/saga'
import siteInfoSaga from '../containers/SiteInfoContainer/saga'

export default function *rootSaga () {
  yield all([
    pageSaga(),
    siteInfoSaga()
  ])
}