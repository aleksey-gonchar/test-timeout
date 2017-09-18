import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

export const PlaceToGo = (props) => {
  return (
    <ListGroupItem>
      { props.place.name }
    </ListGroupItem>
  )
}
