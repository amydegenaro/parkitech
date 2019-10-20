import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactMapGL, {Marker} from 'react-map-gl'
import {addTicket} from '../store'
import MapPin from './MapPin'

const TOKEN =
  'pk.eyJ1IjoiYW15ZGVnZW5hcm8iLCJhIjoiY2prY29uaXpkMThpdjN3bWltNXN1MjdnZCJ9.PoBLx3hpU-M2Ls-jJF-Qtg'

class AddTicketForm extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      taskName: '',
      status: 'open',
      priority: 'low',
      description: '',
      viewport: {
        width: '100%',
        height: '100%',
        latitude: 42.3601,
        longitude: -71.0589,
        zoom: 14
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize)
    this._resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize)
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || '100%',
        height: this.props.height || '100%'
      }
    })
  }

  _updateViewport = viewport => {
    this.setState({viewport})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const ticket = {
      name: this.state.taskName,
      status: this.state.status,
      priority: this.state.priority,
      description: this.state.description,
      latitude: this.state.viewport.latitude,
      longitude: this.state.viewport.longitude
    }
    this.props.addNewTask(ticket, this.props.match.params.id)
    this.props.history.push('/tasks')
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  getCurrentLocation() {
    this.setState({loading: true})
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            loading: false,
            viewport: {
              ...this.state.viewport,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          })
        },
        () => {
          alert('Unable to retrieve location.')
        },
        {
          enableHighAccuracy: true,
          timeout: 30000
        }
      )
    } else alert('Geolocation not supported')
  }

  render() {
    return (
      <div className="flex-row">
        <form onSubmit={this.handleSubmit} className="flex-form">
          <div id="form-wrapper" className="flex-column">
            <div className="form-group">
              <label htmlFor="taskName">Name</label>
              <input
                onChange={this.handleChange}
                name="taskName"
                placeholder="Task Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={this.handleChange}
                name="description"
                placeholder="Description"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <div className="col-auto">
                <label htmlFor="status">Status</label>
                <select
                  onChange={this.handleChange}
                  name="status"
                  value={this.state.status}
                  className="form-control"
                >
                  <option value="open">Open</option>
                  <option value="assigned">Assigned</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="col-auto">
                <label htmlFor="priority">Priority</label>
                <select
                  onChange={this.handleChange}
                  name="priority"
                  value={this.state.priority}
                  className="form-control"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <label htmlFor="location">Mark location on map</label>
            <button
              type="button"
              name="location"
              className="form-control btn btn-success"
              onClick={this.getCurrentLocation}
            >
              Go to Current Location
            </button>
            <button className="form-control btn btn-primary" type="submit">
              Add Task
            </button>
          </div>

        </form>

        <div className="flex-map">
          {this.state.loading ? (
            <img id="loading" src="https://i.gifer.com/WHda.gif" />
          ) : (
            <ReactMapGL
              {...this.state.viewport}
              onViewportChange={this._updateViewport}
              mapboxApiAccessToken={TOKEN}
              mapStyle="mapbox://styles/mapbox/outdoors-v9"
            >
              <Marker
                longitude={this.state.viewport.longitude}
                latitude={this.state.viewport.latitude}
              >
                <MapPin size={30} />
              </Marker>
            </ReactMapGL>
          )}
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addNewTask: (task, listId) => dispatch(addTicket(task, listId))
})

export default connect(null, mapDispatchToProps)(AddTicketForm)
