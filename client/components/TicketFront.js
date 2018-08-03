import React from 'react'

const TicketFront = props => {
  const {ticket} = props

  return (
    <div>
      <p>{ticket.name}</p>
      {/* static map */}
      <button>Details</button>
    </div>
  )
}

export default TicketFront
