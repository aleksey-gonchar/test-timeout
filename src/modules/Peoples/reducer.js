import { handleActions, createAction } from 'redux-actions'
import axios from 'axios'

import { PEOPLES_CMP_ID } from './constants'

export const PEOPLES_GET_REQUEST = `timeout/${PEOPLES_CMP_ID}/get:request`
export const PEOPLES_GET_ERROR = `timeout/${PEOPLES_CMP_ID}/get:error`
export const PEOPLES_GET_SUCCESS = `timeout/${PEOPLES_CMP_ID}/get:success`

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
  getPeoplesSuccess: createAction(PEOPLES_GET_SUCCESS, payload => payload.data),
  getPeoplesError: createAction(PEOPLES_GET_ERROR, err => err.response)
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
  })
}, initialState)

const getAll = (state) => state[PEOPLES_CMP_ID]

export const peoplesSelectors = {
  getAll
}
