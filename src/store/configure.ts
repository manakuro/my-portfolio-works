import { Store } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import rootReducer from '../modules/reducers'

import createBrowserHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import epics from '@/modules/epics'

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middlewares = [routerMiddleware(history), createEpicMiddleware(epics)]

export default function configureStore(): Store<any> {
  return createStore(
    combineReducers({
      ...rootReducer,
      router: routerReducer,
    }),
    applyMiddleware(...middlewares),
  )
}
