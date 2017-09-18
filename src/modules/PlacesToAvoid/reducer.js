import { createSelector } from 'reselect'
import _ from 'lodash'

import { placesToGoSelectors } from '~/modules/PlacesToGo'
import { placesSelectors } from '~/modules/Root'

const getAll = createSelector(
  placesSelectors.getAll,
  placesToGoSelectors.getAll,
  (places, placesToGo) => places.reduce((res, place) => {
    const placeToGo = _.find(placesToGo, { uuid: place.uuid })
    if (placeToGo) return res
    res.push(place)
    return res
  }, [])
)

export const placesToAvoidSelectors = {
  getAll
}
