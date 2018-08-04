import React from 'react'
import {Link} from 'react-router-dom'

const TicketFront = props => {
  const {ticket} = props

  return (
    <div className="list-item" draggable>
      <p>{ticket.name}</p>
      {/* static map or pin if geotagged */}
      <Link to={`/tasks/${ticket.id}`}>
        <button>Details</button>
      </Link>
    </div>
  )
}

export default TicketFront
