import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTicket, updateTicket} from '../store'
import ReactMapGL, {Marker} from 'react-map-gl'
import MapPin from './MapPin'

const TOKEN =
  'pk.eyJ1IjoiYW15ZGVnZW5hcm8iLCJhIjoiY2prY29uaXpkMThpdjN3bWltNXN1MjdnZCJ9.PoBLx3hpU-M2Ls-jJF-Qtg'

class TicketBack extends Component {
  constructor() {
    super()
    this.state = {
      taskName: '',
      status: 'open',
      priority: 'low',
      description: '',
      listId: '',
      viewport: {
        width: window.innerWidth,
        height: 400,
        latitude: 0,
        longitude: 0,
        zoom: 14
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchTicketDetails(this.props.match.params.id)
    this.setState((prevState, props) => ({
      taskName: props.currentTicket.name,
      status: props.currentTicket.status,
      priority: props.currentTicket.priority,
      description: props.currentTicket.description,
      listId: props.currentTicket.listId,
      viewport: {
        ...prevState.viewport,
        latitude: props.currentTicket.latitude,
        longitude: props.currentTicket.longitude
      }
    }))
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
        height: this.props.height || window.innerHeight * 0.85
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
    this.props.updateTask(
      ticket,
      +this.state.listId,
      +this.props.match.params.id
    )
    this.props.history.push('/tasks')
  }

  handleCancel(evt) {
    evt.preventDefault()
    this.props.history.push('/tasks')
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {latitude, longitude} = this.props.currentTicket

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div id="form-wrapper" className="flex-column">
            <div className="form-group">
              <label htmlFor="taskName">Name</label>
              <input
                onChange={this.handleChange}
                name="taskName"
                value={this.state.taskName}
                placeholder="Task Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={this.handleChange}
                name="description"
                value={this.state.description}
                placeholder="Description"
                className="form-control"
              />
            </div>
            <div className="form-row">
              {/* <div className="form-group"> */}
                <div className="col">
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
                <div className="col">
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
              {/* </div> */}
            </div>
            <div className="form-group">
              <label htmlFor="listId">List</label>
              <select
                onChange={this.handleChange}
                name="listId"
                value={this.state.listId}
                className="form-control"
              >
                {this.props.lists.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <button className="form-control btn btn-primary" type="submit">
                Save
              </button>
              <button className="form-control btn btn-default" type="button" onClick={this.handleCancel}>
                Cancel
              </button>
            </div>
          </div>

          <div className="flex-column">
            {latitude ? (
              <ReactMapGL
                {...this.state.viewport}
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={TOKEN}
                mapStyle="mapbox://styles/mapbox/outdoors-v9"
              >
                <Marker latitude={latitude} longitude={longitude}>
                  <MapPin size={30} />
                </Marker>
              </ReactMapGL>
            ) : (
              <p>Loading coordinates...</p>
            )}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentTicket: state.currentTicket,
  lists: state.allLists
})

const mapDispatchToProps = dispatch => ({
  fetchTicketDetails: id => dispatch(getTicket(id)),
  updateTask: (task, list, id) => dispatch(updateTicket(task, list, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TicketBack)
