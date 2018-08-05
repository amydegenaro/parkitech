import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactMapGL from 'react-map-gl'
import {addTicket} from '../store'

const TOKEN =
  'pk.eyJ1IjoiYW15ZGVnZW5hcm8iLCJhIjoiY2prY29uaXpkMThpdjN3bWltNXN1MjdnZCJ9.PoBLx3hpU-M2Ls-jJF-Qtg'

class AddTicketForm extends Component {
  constructor() {
    super()
    this.state = {
      taskName: '',
      status: 'open',
      priority: 'low',
      description: '',
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 42.3601,
        longitude: -71.0589,
        zoom: 12
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
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
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
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(
          `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`
        )
        this.setState({
          viewport: {
            ...this.state.viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      },
      () => {
        alert('Unable to retrieve location.')
      }
    )
  }

  render() {
    return (
      <div>
        <form id="task-form" onSubmit={this.handleSubmit}>
          <button type="submit">Add Task</button>
          <div>
            <input
              onChange={this.handleChange}
              name="taskName"
              placeholder="Task Name"
            />
            <textarea
              onChange={this.handleChange}
              name="description"
              placeholder="Description"
            />
            <label htmlFor="status">Status</label>
            <select
              onChange={this.handleChange}
              name="status"
              value={this.state.status}
            >
              <option value="open">Open</option>
              <option value="assigned">Assigned</option>
              <option value="closed">Closed</option>
            </select>
            <label htmlFor="priority">Priority</label>
            <select
              onChange={this.handleChange}
              name="priority"
              value={this.state.priority}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex-column">
            <button type="button" onClick={this.getCurrentLocation}>
              Current Location
            </button>
            <ReactMapGL
              {...this.state.viewport}
              onViewportChange={this._updateViewport}
              mapboxApiAccessToken={TOKEN}
              mapStyle="mapbox://styles/mapbox/outdoors-v9"
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addNewTask: (task, listId) => dispatch(addTicket(task, listId))
})

export default connect(null, mapDispatchToProps)(AddTicketForm)
