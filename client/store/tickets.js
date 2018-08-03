import axios from 'axios'

const GOT_ALL_TICKETS = 'GOT_ALL_TICKETS'

const gotAllTickets = tickets => ({
  type: GOT_ALL_TICKETS,
  tickets: tickets.map(ticket => ({
    id: ticket.id,
    name: ticket.name,
    listId: ticket.listId
  }))
})

export const getAllTickets = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tickets/`)
    dispatch(gotAllTickets(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_ALL_TICKETS:
      return action.tickets
    default:
      return state
  }
}
