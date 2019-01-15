import {trackPageView} from '@redux-beacon/google-analytics-gtag'
import {LOCATION_CHANGE} from 'connected-react-router'

export const eventsMap = {
  [LOCATION_CHANGE]: trackPageView(action => ({
    path: action.payload.location.pathname,
  })),
}
