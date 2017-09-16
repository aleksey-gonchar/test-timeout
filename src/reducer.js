import { combineReducers } from 'redux'

import { ROOT_CMP_ID, rootReducer } from '~/modules/Root'
import { PEOPLES_CMP_ID, peoplesReducer } from '~/modules/Peoples'
import { PLACES_TO_AVOID_CMP_ID, placesToAvoidReducer } from '~/modules/PlacesToAvoid'
import { PLACES_TO_GO_CMP_ID, placesToGoReducer } from '~/modules/PlacesToGo'

export function createReducer () {
  return combineReducers({
    [ROOT_CMP_ID]: rootReducer(),
    [PEOPLES_CMP_ID]: peoplesReducer,
    [PLACES_TO_AVOID_CMP_ID]: placesToAvoidReducer,
    [PLACES_TO_GO_CMP_ID]: placesToGoReducer
  })
}
