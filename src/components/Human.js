import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

export class Human extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    human: PropTypes.object
  }

  render () {
    const style = this.props.human.selected ? 'success' : 'default'

    return (
      <Button bsStyle={style} onClick={() => this.props.onClick(this.props.human)}>
        { this.props.human.name }
      </Button>
    )
  }
}
