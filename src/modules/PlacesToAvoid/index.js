import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import { placesToAvoidActions, placesToAvoidSelectors } from './reducer'
import { PLACES_TO_AVOID_CMP_ID } from './constants'

export * from './reducer'
export * from './constants'

function mapStateToProps (state) {
  return {
    placesToAvoid: placesToAvoidSelectors.getAll(state)
  }
}

function mapActionsToDispatch (dispatch) {
  return {
    actions: { ...bindActionCreators(placesToAvoidActions, dispatch) }
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
    const title = <h3>Places to avoid</h3>
    return (
      <Panel header={title}>
        ..pending
      </Panel>
    )
  }
}

export const PlacesToAvoid = connect(
  mapStateToProps,
  mapActionsToDispatch
)(PlacesToAvoidComponent)
