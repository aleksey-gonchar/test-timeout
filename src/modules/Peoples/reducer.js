import { handleActions, createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import axios from 'axios'
import uuid from 'uuid'
import _ from 'lodash'
import dotProp from 'dot-prop-immutable'

import { PEOPLES_CMP_ID } from './constants'

export const PEOPLES_GET_REQUEST = `timeout/${PEOPLES_CMP_ID}/get:request`
export const PEOPLES_GET_ERROR = `timeout/${PEOPLES_CMP_ID}/get:error`
export const PEOPLES_GET_SUCCESS = `timeout/${PEOPLES_CMP_ID}/get:success`
export const PEOPLES_HUMAN_TOGGLE = `timeout/${PEOPLES_CMP_ID}/human-toggle`

export const peoplesActions = {
  getPeoples: (appConfig) => {
    return (dispatch) => {
      dispatch(peoplesActions.getPeoplesRequest())

      return axios('/users.json')
        .then(payload => dispatch(peoplesActions.getPeoplesSuccess(payload)))
        .catch(err => dispatch(peoplesActions.getPeoplesError(err)))
    }
  },
  getPeoplesRequest: createAction(PEOPLES_GET_REQUEST),
  getPeoplesSuccess: createAction(PEOPLES_GET_SUCCESS, payload => {
    return payload.data.map(el => {
      el.uuid = uuid.v4()
      return el
    })
  }),
  getPeoplesError: createAction(PEOPLES_GET_ERROR, err => err.response),
  toggleHuman: createAction(PEOPLES_HUMAN_TOGGLE)
}

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: null,
  data: []
}

export const peoplesReducer = handleActions({
  [PEOPLES_GET_REQUEST]: (state, action) => ({
    ...initialState,
    isLoading: true,
    error: null
  }),
  [PEOPLES_GET_SUCCESS]: (state, action) => ({
    isLoading: false,
    isLoaded: true,
    data: action.payload
  }),
  [PEOPLES_GET_ERROR]: (state, action) => ({
    ...initialState,
    isLoading: false,
    error: action.payload
  }),
  [PEOPLES_HUMAN_TOGGLE]: (state, action) => {
    const human = action.payload
    const idx = _.findIndex(state.data, { uuid: human.uuid })
    const newState = dotProp.set(state, `data.${idx}.selected`, !human.selected)
    return newState
  }
}, initialState)

const getAll = (state) => state[PEOPLES_CMP_ID].data
const getAllSorted = createSelector(getAll, state => _.sortBy(state, 'name'))

export const peoplesSelectors = {
  getAll,
  getAllSorted
}
