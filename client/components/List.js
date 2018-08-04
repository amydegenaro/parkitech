import React from 'react'
import TicketFront from './TicketFront'
import {Link} from 'react-router-dom'

const List = props => {
  const {handleDrag} = props

  return (
    <div className="list" onDragOver={handleDrag}>
      <p>{props.list.name}</p>
      {props.tickets.map(ticket => (
        <TicketFront key={ticket.id} ticket={ticket} />
      ))}
      <Link to="/tasks/add">
        <button>Add Task</button>
      </Link>
    </div>
  )
}

export default List
