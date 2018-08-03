import axios from 'axios'

const GOT_TICKET = 'GOT_TICKET'

const gotTicket = ticket => ({
  type: GOT_TICKET,
  ticket
})

export const getTicket = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/tickets/${id}`)
    dispatch(gotTicket(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_TICKET:
      return action.ticket
    default:
      return state
  }
}
