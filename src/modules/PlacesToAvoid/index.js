import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel, ListGroup } from 'react-bootstrap'

import { placesToAvoidSelectors } from './reducer'
import { PLACES_TO_AVOID_CMP_ID } from './constants'
import { PlaceToAvoid } from '~/components'

export * from './reducer'
export * from './constants'

function mapStateToProps (state) {
  return {
    placesToAvoid: placesToAvoidSelectors.getAll(state)
  }
}

class PlacesToAvoidComponent extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.any,
    className: PropTypes.any,
    [PLACES_TO_AVOID_CMP_ID]: PropTypes.any
  }

  render () {
    const places = this.props.placesToAvoid.map(place => (
      <PlaceToAvoid
        place={place}
        key={place.uuid} id={place.uuid}
      />
    )) || 'no places found...'

    const title = <h3>Places to avoid</h3>
    return (
      <Panel header={title}>
        <ListGroup fill>
          {places}
        </ListGroup>
      </Panel>
    )
  }
}

export const PlacesToAvoid = connect(
  mapStateToProps
)(PlacesToAvoidComponent)
