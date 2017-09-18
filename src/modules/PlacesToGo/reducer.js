import { createSelector } from 'reselect'
import _ from 'lodash'

import { placesSelectors } from '~/modules/Root'
import { peoplesSelectors } from '~/modules/Peoples'

const getAll = createSelector(
  placesSelectors.getAll,
  peoplesSelectors.getSelected,
  (places, peoples) => places.reduce((res, place) => {
    const hasAllPrefsDrinks = _.every(peoples, (human) => {
      const placeDrinks = place.drinks.map(drink => drink.toUpperCase())
      const prefDrinks = human.drinks.map(drink => drink.toUpperCase())
      return _.intersection(placeDrinks, prefDrinks).length > 0
    })
    const hasAllPrefsFood = _.every(peoples, (human) => {
      const placeFood = place.food.map(dish => dish.toUpperCase())
      const prefWontEat = human.wont_eat.map(dish => dish.toUpperCase())
      return _.without(placeFood, prefWontEat).length > 0
    })
    if (!hasAllPrefsDrinks || !hasAllPrefsFood) return res
    res.push(place)
    return res
  }, [])
)

export const placesToGoSelectors = {
  getAll
}
