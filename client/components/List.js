import React from 'react'
import {TicketFront} from './TicketFront'

const List = props => {
  return (
    <div>
      <p>{props.list.name}</p>
      {props.tickets.map(ticket => (
        <TicketFront key={ticket.id} ticket={ticket} />
      ))}
      <button>Add Task</button>
    </div>
  )
}

export default List
