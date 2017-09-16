import { handleActions, createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import axios from 'axios'

import { ROOT_CMP_ID, PLACES_SLICE_ID } from '../constants'

export const PLACES_GET_REQUEST = `timeout/${ROOT_CMP_ID}/${PLACES_SLICE_ID}/get:request`
export const PLACES_GET_ERROR = `timeout/${ROOT_CMP_ID}/${PLACES_SLICE_ID}/get:error`
export const PLACES_GET_SUCCESS = `timeout/${ROOT_CMP_ID}/${PLACES_SLICE_ID}/get:success`

export const placesActions = {
  getPlaces: (appConfig) => {
    return (dispatch) => {
      dispatch(placesActions.getPlacesRequest())

      return axios('/venues.json')
        .then(payload => dispatch(placesActions.getPlacesSuccess(payload)))
        .catch(err => dispatch(placesActions.getPlacesError(err)))
    }
  },
  getPlacesRequest: createAction(PLACES_GET_REQUEST),
  getPlacesSuccess: createAction(PLACES_GET_SUCCESS, payload => payload.data),
  getPlacesError: createAction(PLACES_GET_ERROR, err => err.response)
}

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: null,
  data: []
}

export const placesReducer = handleActions({
  [PLACES_GET_REQUEST]: (state, action) => ({
    ...initialState,
    isLoading: true,
    error: null
  }),
  [PLACES_GET_SUCCESS]: (state, action) => ({
    isLoading: false,
    isLoaded: true,
    data: action.payload
  }),
  [PLACES_GET_ERROR]: (state, action) => ({
    ...initialState,
    isLoading: false,
    error: action.payload
  })
}, initialState)

const getRoot = (state) => state[ROOT_CMP_ID]
const getAll = createSelector(getRoot, state => state[PLACES_SLICE_ID])

export const placesSelectors = {
  getAll
}
