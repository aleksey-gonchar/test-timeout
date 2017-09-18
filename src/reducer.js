import { combineReducers } from 'redux'

import { ROOT_CMP_ID, rootReducer } from '~/modules/Root'
import { PEOPLES_CMP_ID, peoplesReducer } from '~/modules/Peoples'

export function createReducer () {
  return combineReducers({
    [ROOT_CMP_ID]: rootReducer(),
    [PEOPLES_CMP_ID]: peoplesReducer
  })
}
