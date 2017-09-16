import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { ROOT_CMP_ID } from './constants'

export function rootReducer () {
  return combineReducers({})
}

const getAll = (state) => state[ROOT_CMP_ID]

export const rootSelectors = {
  getAll
}
