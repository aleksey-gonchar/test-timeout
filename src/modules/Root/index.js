import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Navbar } from '~/components/Navbar'

import { rootSelectors } from './reducer'
import { placesActions } from './reducers'
import { ROOT_CMP_ID } from './constants'
import { Peoples } from '~/modules/Peoples'
import { PlacesToGo } from '~/modules/PlacesToGo'
import { PlacesToAvoid } from '~/modules/PlacesToAvoid'

export * from './reducer'
export * from './reducers'
export * from './constants'

function mapStateToProps (state) {
  return {
    state: rootSelectors.getAll(state),
    places: rootSelectors.places.getAll(state)
  }
}

function mapActionsToDispatch (dispatch) {
  return {
    actions: { ...bindActionCreators(placesActions, dispatch) }
  }
}

class RootComponent extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.any,
    className: PropTypes.any,
    [ROOT_CMP_ID]: PropTypes.any
  }

  componentDidMount () {
    this.props.actions.getPlaces()
  }

  render () {
    return (
      <div>
        <Navbar />
        <Grid>
          <Row>
            <Col md={12}><Peoples /></Col>
          </Row>
          <Row>
            <Col md={6}><PlacesToGo /></Col>
            <Col md={6}><PlacesToAvoid /></Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export const Root = connect(
  mapStateToProps,
  mapActionsToDispatch
)(RootComponent)
