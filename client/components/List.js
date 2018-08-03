import React from 'react'
import {connect} from 'react-redux'
import {TicketFront} from './TicketFront'

export const List = props => {
  const {list, tickets} = props

  return (
    <div>
      <p>{list.name}</p>
      {tickets.map(ticket => <TicketFront key={ticket.id} />)}
    </div>
  )
}
