import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTicket} from '../store'
import ReactMapGL, {Marker} from 'react-map-gl'

const TOKEN =
  'pk.eyJ1IjoiYW15ZGVnZW5hcm8iLCJhIjoiY2prY29uaXpkMThpdjN3bWltNXN1MjdnZCJ9.PoBLx3hpU-M2Ls-jJF-Qtg'

class TicketBack extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 0,
        longitude: 0,
        zoom: 12
      }
    }
  }

  async componentDidMount() {
    await this.props.fetchTicketDetails(this.props.match.params.id)
    this.setState((prevState, props) => ({
      viewport: {
        ...prevState.viewport,
        latitude: props.currentTicket.latitude,
        longitude: props.currentTicket.longitude
      }
    }))
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
            {...this.state.viewport}
            onViewportChange={viewport => this.setState({viewport})}
            mapboxApiAccessToken={TOKEN}
            mapStyle="mapbox://styles/mapbox/outdoors-v9"
          >
            <Marker latitude={latitude} longitude={longitude}>
              <div>Here</div>
            </Marker>
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
