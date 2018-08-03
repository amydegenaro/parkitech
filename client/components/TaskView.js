import React, {Component} from 'react'
import {connect} from 'react-redux'
import List from './List'
import {getAllLists, getAllTickets} from '../store'

class TaskView extends Component {
  componentDidMount() {
    this.props.fetchAllLists()
    this.props.fetchAllTickets()
  }

  render() {
    return (
      <div>
        <p>Task Lists</p>
        {this.props.allLists.map(list => {
          const tickets = this.props.allTickets.filter(
            ticket => ticket.listId === list.id
          )
          return <List key={list.id} list={list} tickets={tickets} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allLists: state.allLists,
  allTickets: state.allTickets
})

const mapDispatchToProps = dispatch => ({
  fetchAllLists: () => dispatch(getAllLists()),
  fetchAllTickets: id => dispatch(getAllTickets(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskView)
