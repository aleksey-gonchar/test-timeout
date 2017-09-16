import { combineReducers } from 'redux'
import { ROOT_CMP_ID, PLACES_SLICE_ID } from './constants'
import { placesReducer, placesSelectors } from './reducers'

export function rootReducer () {
  return combineReducers({
    [PLACES_SLICE_ID]: placesReducer
  })
}

const getAll = (state) => state[ROOT_CMP_ID]

export const rootSelectors = {
  getAll,
  places: placesSelectors
}
