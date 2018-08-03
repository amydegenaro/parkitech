import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTicket} from '../store'

class TicketBack extends Component {
  componentDidMount() {
    this.props.fetchTicketDetails(this.props.match.params.id)
  }
  render() {
    const {
      name,
      status,
      priority,
      description,
      latitude,
      longitude
    } = this.props.currentTicket
    return (
      <div>
        <p>{name}</p>
        <p>{description}</p>
        <p>Status: {status}</p>
        <p>Priority: {priority}</p>
        <p>MAP HERE</p>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  currentTicket: state.currentTicket
})

const mapDispatchToProps = dispatch => ({
  fetchTicketDetails: id => dispatch(getTicket(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TicketBack)
