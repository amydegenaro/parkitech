import axios from 'axios'

const GOT_ALL_LISTS = 'GOT_ALL_LISTS'

const gotAllLists = lists => ({
  type: GOT_ALL_LISTS,
  lists
})

export const getAllLists = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/lists/')
    dispatch(gotAllLists(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_ALL_LISTS:
      return action.lists
    default:
      return state
  }
}
