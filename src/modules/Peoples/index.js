import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel, ButtonToolbar } from 'react-bootstrap'

import { peoplesActions, peoplesSelectors } from './reducer'
import { PEOPLES_CMP_ID } from './constants'
import { Human } from '~/components'
export * from './reducer'
export * from './constants'

function mapStateToProps (state) {
  return {
    peoples: peoplesSelectors.getAllSorted(state)
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

  constructor (props) {
    super(props)
    this.onHumanClick = this.onHumanClick.bind(this)
  }

  componentDidMount () {
    this.props.actions.getPeoples()
  }

  onHumanClick (human) {
    this.props.actions.toggleHuman(human)
  }

  render () {
    let peoples = []
    peoples = this.props.peoples.map(human => (
      <Human
        human={human} onClick={this.onHumanClick}
        key={human.uuid} id={human.uuid}
      />
    ))

    const title = <h3>Teammates</h3>
    return (
      <Panel header={title}>
        <ButtonToolbar>
          {peoples}
        </ButtonToolbar>
      </Panel>
    )
  }
}

export const Peoples = connect(
  mapStateToProps,
  mapActionsToDispatch
)(PeoplesComponent)
