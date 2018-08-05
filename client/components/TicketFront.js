import React from 'react'
import {Link} from 'react-router-dom'

const TicketFront = props => {
  const {ticket} = props

  return (
    <div className="list-item" draggable>
      {/* static map or pin if geotagged */}
      <Link className="task-header" to={`/tasks/${ticket.id}`}>
        {ticket.name}
      </Link>
    </div>
  )
}

export default TicketFront
