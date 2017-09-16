import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { LoggerService } from './services/logger'
import { configureStore } from './store'
import { Root } from '~/modules/Root/wa-root'
import './styles'

LoggerService.setGlobalTitle('test')

const logger = new LoggerService()
logger.setTitle('main')

let initialState = {}

logger.info('starting app...')

export const store = configureStore(initialState)

const mainContainerId = 'timeout-test-app'
let mainContainer = document.getElementById('app')
if (!mainContainer) {
  mainContainer = document.createElement('div')
  mainContainer.id = mainContainerId
  document.body.appendChild(mainContainer)
}

ReactDOM.render(
  <Provider store={store} >
    <Root />
  </Provider>,
  mainContainer
)
