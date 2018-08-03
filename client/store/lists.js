import axios from 'axios'

const GOT_LISTS = 'GOT_LISTS'

const gotLists = lists => ({
  type: GOT_LISTS,
  lists
})

export const getLists = () => async dispatch => {
  try {
    const {data} = axios.get('/api/lists/')
    dispatch(gotLists(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_LISTS:
      return action.lists
    default:
      return state
  }
}
