import React from 'react'

export const TicketFront = props => {
  const {ticket} = props

  return (
    <div>
      <p>{ticket.name}</p>
      {/* static map */}
      <button>Details</button>
    </div>
  )
}
