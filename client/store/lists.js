import axios from 'axios'

const GOT_ALL_LISTS = 'GOT_ALL_LISTS'
const ADDED_LIST = 'ADDED_LIST'

const gotAllLists = lists => ({
  type: GOT_ALL_LISTS,
  lists
})

const addedList = list => ({
  type: ADDED_LIST,
  list
})

export const getAllLists = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/lists/')
    dispatch(gotAllLists(data))
  } catch (err) {
    console.error(err)
  }
}

export const addList = list => async dispatch => {
  try {
    const {data} = await axios.post(`/api/lists/`, list)
    dispatch(addedList(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_ALL_LISTS:
      return action.lists
    case ADDED_LIST:
      return [...state, action.list]
    default:
      return state
  }
}
