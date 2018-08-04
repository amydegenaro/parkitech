import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTicket} from '../store'
import ReactMapGL, {Marker} from 'react-map-gl'

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
        {latitude ? (
          <ReactMapGL
            width={400}
            height={400}
            latitude={latitude}
            longitude={longitude}
            zoom={12}
            mapboxApiAccessToken="pk.eyJ1IjoiYW15ZGVnZW5hcm8iLCJhIjoiY2prY29uaXpkMThpdjN3bWltNXN1MjdnZCJ9.PoBLx3hpU-M2Ls-jJF-Qtg"
          >
            <Marker latitude={latitude} longitude={longitude} />
          </ReactMapGL>
        ) : (
          <p>Loading coordinates...</p>
        )}
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
