import React from 'react'
import TicketFront from './TicketFront'
import AddTicketForm from './addTicketForm'

const List = props => {
  const {handleDrag, handleSubmit, handleChange} = props

  return (
    <div className="list" onDragOver={handleDrag}>
      <p>{props.list.name}</p>
      {props.tickets.map(ticket => (
        <TicketFront key={ticket.id} ticket={ticket} />
      ))}
      <button>Add Task</button>
    </div>
  )
}

export default List
