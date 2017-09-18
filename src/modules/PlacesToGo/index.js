import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel, ListGroup } from 'react-bootstrap'

import { placesToGoActions, placesToGoSelectors } from './reducer'
import { PLACES_TO_GO_CMP_ID } from './constants'
import { PlaceToGo } from '~/components/PlaceToGo'

export * from './reducer'
export * from './constants'

function mapStateToProps (state) {
  return {
    placesToGo: placesToGoSelectors.getAll(state)
  }
}

class PlacesToGoComponent extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.any,
    className: PropTypes.any,
    [PLACES_TO_GO_CMP_ID]: PropTypes.any
  }

  render () {
    const places = this.props.placesToGo.map(place => (
      <PlaceToGo
        place={place}
        key={place.uuid} id={place.uuid}
      />
    )) || 'no places found...'

    const title = <h3>Places to go</h3>
    return (
      <Panel header={title}>
        <ListGroup fill>
          {places}
        </ListGroup>
      </Panel>
    )
  }
}

export const PlacesToGo = connect(
  mapStateToProps
)(PlacesToGoComponent)
