import React from 'react'
import TicketFront from './TicketFront'
import {Link} from 'react-router-dom'

const List = props => {
  const {handleDrag, list} = props

  return (
    <div className="list" onDragOver={handleDrag}>
      <p className="list-header">{props.list.name}</p>
      {props.tickets.map(ticket => (
        <TicketFront key={ticket.id} ticket={ticket} />
      ))}
      <Link to={`/tasks/list/${list.id}/add`}>
        <button className="btn btn-primary btn-sm">Add Task</button>
      </Link>
    </div>
  )
}

export default List
