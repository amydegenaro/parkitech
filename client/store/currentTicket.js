import axios from 'axios'

const GOT_TICKET = 'GOT_TICKET'

const gotTicket = ticket => ({
  type: GOT_TICKET,
  ticket
})

export const getTicket = id => async (dispatch, getState) => {
  try {
    const orgId = getState().user.organizationId
    const {data} = await axios.get(`/api/org/${orgId}/tickets/${id}`)
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
