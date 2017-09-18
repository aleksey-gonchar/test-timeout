import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

export const PlaceToAvoid = (props) => {
  return (
    <ListGroupItem>
      { props.place.name }
    </ListGroupItem>
  )
}
