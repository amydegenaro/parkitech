import axios from 'axios'

const GOT_ALL_TICKETS = 'GOT_ALL_TICKETS'
const ADDED_TICKET = 'ADDED_TICKET'

const gotAllTickets = tickets => ({
  type: GOT_ALL_TICKETS,
  tickets: tickets.map(ticket => ({
    id: ticket.id,
    name: ticket.name,
    listId: ticket.listId
  }))
})

const addedTicket = ticket => ({
  type: ADDED_TICKET,
  ticket: {
    id: ticket.id,
    name: ticket.name,
    listId: ticket.listId
  }
})

export const getAllTickets = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tickets/`)
    dispatch(gotAllTickets(data))
  } catch (err) {
    console.error(err)
  }
}

export const addTicket = (ticket, listId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/tickets/list/${listId}/`, ticket)
    dispatch(addedTicket(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_ALL_TICKETS:
      return action.tickets
    case ADDED_TICKET:
      return [...state, action.ticket]
    default:
      return state
  }
}
