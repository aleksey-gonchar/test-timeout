import { combineReducers } from 'redux'

import { ROOT_CMP_ID, rootReducer } from '~/modules/Root'

export function createReducer () {
  return combineReducers({
    [ROOT_CMP_ID]: rootReducer()
  })
}
