import React from 'react'
import TicketFront from './TicketFront'
import {Link} from 'react-router-dom'

const List = props => {
  const {handleDrag, list, handleDelete} = props

  return (
    <div className="list" onDragOver={handleDrag}>
      <p className="list-header">{props.list.name}</p>
      <button type="button" onClick={() => handleDelete(list)} >X</button>
      {props.tickets.map(ticket => (
        <TicketFront key={ticket.id} ticket={ticket} />
      ))}
      <Link to={`/tasks/list/${list.id}/add`}>
        <button type="button"  className="btn btn-primary btn-sm">Add Task</button>
      </Link>
    </div>
  )
}

export default List
