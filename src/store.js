import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { createReducer } from './reducer'

export function configureStore (initialState) {
  initialState = initialState || {}

  const middlewares = [
    thunk
  ]

  if (window.ENV !== 'production') {
    const opts = {
      collapsed: true
    }

    if (window.IS_NODE) {
      opts.colors = false
    } else {
      const { createLogger } = require('redux-logger')
      const logger = createLogger(opts)
      middlewares.push(logger)
    }
  }

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const composeEnhancers =
    window.ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )

  return store
}
