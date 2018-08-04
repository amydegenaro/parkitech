import React, {Component} from 'react'

class AddTicketForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      status: 'open',
      priority: 'low',
      description: '',
      latitude: 0,
      longitude: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('SUBMITTED', this.state)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser!')
    }
    navigator.geolocation.getCurrentPosition(showPosition, error)
    function showPosition(position) {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }
    function error() {
      alert(
        'Unable to retrieve your location! Allow the browser to share your location.'
      )
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <select
          onChange={this.handleChange}
          name="status"
          value={this.state.status}
        >
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
          <option value="closed">Closed</option>
        </select>
        <select
          onChange={this.handleChange}
          name="priority"
          value={this.state.priority}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={this.getCurrentLocation}>Current Location</button>
        {/* MAP */}
        <button type="submit">Add Task</button>
      </form>
    )
  }
}

export default AddTicketForm
