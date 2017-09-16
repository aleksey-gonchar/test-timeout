import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import { peoplesActions, peoplesSelectors } from './reducer'
import { PEOPLES_CMP_ID } from './constants'

export * from './reducer'
export * from './constants'

function mapStateToProps (state) {
  return {
    peoples: peoplesSelectors.getAll(state)
  }
}

function mapActionsToDispatch (dispatch) {
  return {
    actions: { ...bindActionCreators(peoplesActions, dispatch) }
  }
}

class PeoplesComponent extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.any,
    className: PropTypes.any,
    [PEOPLES_CMP_ID]: PropTypes.any
  }

  componentDidMount () {
    this.props.actions.getPeoples()
  }

  render () {
    const title = <h3>Teammates</h3>
    return (
      <Panel header={title}>
        ..pending
      </Panel>
    )
  }
}

export const Peoples = connect(
  mapStateToProps,
  mapActionsToDispatch
)(PeoplesComponent)
