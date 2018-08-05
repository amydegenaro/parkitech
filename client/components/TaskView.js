import React, {Component} from 'react'
import {connect} from 'react-redux'
import List from './List'
import {getAllLists, getAllTickets, addList} from '../store'
import AddListForm from './addListForm'

class TaskView extends Component {
  constructor() {
    super()
    this.state = {
      showListForm: false
    }
    this.showForm = this.showForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchAllLists()
    this.props.fetchAllTickets()
  }

  showForm() {
    const form = this.state.showListForm
    this.setState({showListForm: !form})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addNewList({name: this.state.listName})
    this.setState({showListForm: false})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleDrag(evt) {
    evt.preventDefault()
  }

  render() {
    return (
      <div className="main">
        <h3>Lists</h3>
        <div className="list-container">
          {this.props.allLists.map(list => {
            const tickets = this.props.allTickets.filter(
              ticket => ticket.listId === list.id
            )
            return <List key={list.id} list={list} tickets={tickets} />
          })}
        </div>
        {this.state.showListForm ? (
          <div>
            <button onClick={this.showForm}>Cancel</button>
            <AddListForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </div>
        ) : (
          <button onClick={this.showForm}>New List</button>
        )}
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
  fetchAllTickets: id => dispatch(getAllTickets(id)),
  addNewList: list => dispatch(addList(list))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskView)
