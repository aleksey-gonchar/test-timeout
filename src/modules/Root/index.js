import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { rootSelectors } from './reducer'
import { ROOT_CMP_ID } from './constants'

export * from './reducer'
// export * from './reducers'
export * from './constants'

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

  render () {
    return (
      <div>
        Hello world!
      </div>
    )
  }
}

export const Root = RootComponent
// export const Root = connect(
//   mapStateToProps,
//   mapActionsToDispatch
// )(RootComponent)
