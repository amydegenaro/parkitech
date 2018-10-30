import axios from 'axios'

const GOT_ALL_LISTS = 'GOT_ALL_LISTS'
const ADDED_LIST = 'ADDED_LIST'
const REMOVED_LIST = 'REMOVED_LIST'

const gotAllLists = lists => ({
  type: GOT_ALL_LISTS,
  lists
})

const addedList = list => ({
  type: ADDED_LIST,
  list
})

const removedList = list => ({
  type: REMOVED_LIST,
  list
})

export const getAllLists = () => async (dispatch, getState) => {
  try {
    const orgId = getState().user.organizationId
    const {data} = await axios.get(`/api/org/${orgId}/lists/`)
    dispatch(gotAllLists(data))
  } catch (err) {
    console.error(err)
  }
}

export const addList = list => async (dispatch, getState) => {
  try {
    const orgId = getState().user.organizationId
    const {data} = await axios.post(`/api/org/${orgId}/lists/`, list)
    dispatch(addedList(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeList = list => async (dispatch, getState) => {
  try {
    const orgId = getState().user.organizationId
    await axios.delete(`/api/org/${orgId}/lists/${list.id}`)
    dispatch(removedList(list))
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
    case REMOVED_LIST:
      return state.filter(item => item.id !== action.list.id)
    default:
      return state
  }
}
