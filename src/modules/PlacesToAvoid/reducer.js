import { handleActions, createAction } from 'redux-actions'

import { PLACES_TO_AVOID_CMP_ID } from './constants'

export const PLACES_TO_AVOID_GET = `timeout/${PLACES_TO_AVOID_CMP_ID}/get`

export const placesToAvoidActions = {
  get: createAction(PLACES_TO_AVOID_GET)
}

const initialState = []

export const placesToAvoidReducer = handleActions({
  [PLACES_TO_AVOID_GET]: (state, action) => ({...state})
}, initialState)

const getAll = (state) => state[PLACES_TO_AVOID_CMP_ID]

export const placesToAvoidSelectors = {
  getAll
}
