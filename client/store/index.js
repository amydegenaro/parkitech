import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allLists from './lists'
import allTickets from './tickets'
import currentTicket from './currentTicket'
import weather from './weather'

const reducer = combineReducers({
  user,
  weather,
  allLists,
  allTickets,
  currentTicket
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './lists'
export * from './tickets'
export * from './currentTicket'
export * from './weather'
