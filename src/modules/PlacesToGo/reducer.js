import { handleActions, createAction } from 'redux-actions'

import { PLACES_TO_GO_CMP_ID } from './constants'

export const PLACES_TO_GO_GET = `timeout/${PLACES_TO_GO_CMP_ID}/get`

export const placesToGoActions = {
  get: createAction(PLACES_TO_GO_GET)
}

const initialState = []

export const placesToGoReducer = handleActions({
  [PLACES_TO_GO_GET]: (state, action) => ({...state})
}, initialState)

const getAll = (state) => state[PLACES_TO_GO_CMP_ID]

export const placesToGoSelectors = {
  getAll
}
