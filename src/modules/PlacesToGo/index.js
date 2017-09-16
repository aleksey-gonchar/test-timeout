import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import { placesToGoActions, placesToGoSelectors } from './reducer'
import { PLACES_TO_GO_CMP_ID } from './constants'

export * from './reducer'
export * from './constants'

function mapStateToProps (state) {
  return {
    placesToGo: placesToGoSelectors.getAll(state)
  }
}

function mapActionsToDispatch (dispatch) {
  return {
    actions: { ...bindActionCreators(placesToGoActions, dispatch) }
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
    const title = <h3>Places to go</h3>
    return (
      <Panel header={title}>
        ..pending
      </Panel>
    )

  }
}

export const PlacesToGo = connect(
  mapStateToProps,
  mapActionsToDispatch
)(PlacesToGoComponent)
