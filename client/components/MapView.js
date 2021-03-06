import React, {Component} from 'react'
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl'
import {connect} from 'react-redux'
import ControlPanel from './MapControlPanel'
import MapPin from './MapPin'
import {getAllTickets} from '../store'

const TOKEN =
  'pk.eyJ1IjoiYW15ZGVnZW5hcm8iLCJhIjoiY2prY29uaXpkMThpdjN3bWltNXN1MjdnZCJ9.PoBLx3hpU-M2Ls-jJF-Qtg'

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

class MapView extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 42.3601,
        longitude: -71.0589,
        zoom: 13
      },
      visibility: {
        status: 'all',
        priority: 'all'
      },
      color: {
        open: 'green',
        assigned: 'purple',
        closed: 'black',
        low: '#2039c6', // blue
        medium: '#f7e922', //yellow
        high: '#c62121' //red
      },
      popupInfo: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllTasks()
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

  _renderMarker = task => {
    return (
      <Marker key={task.id} longitude={task.longitude} latitude={task.latitude}>
        <MapPin
          size={30}
          color={this.state.color[task.priority]}
          task={task}
          onClick={() => this.setState({popupInfo: task})}
        />
      </Marker>
    )
  }

  _renderPopup = () => {
    const {popupInfo} = this.state

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          latitude={popupInfo.latitude}
          longitude={popupInfo.longitude}
          onClose={() => this.setState({popupInfo: null})}
        >
          <div>
            <p>{popupInfo.name}</p>
          </div>
        </Popup>
      )
    )
  }

  handleChange(evt) {
    this.setState({
      visibility: {
        ...this.state.visibility,
        [evt.target.name]: evt.target.value
      }
    })
  }

  render() {
    const mapTasks = this.props.tasks
      .filter(task => {
        if (this.state.visibility.status === 'all') return task
        else return task.status === this.state.visibility.status
      })
      .filter(task => {
        if (this.state.visibility.priority === 'all') return task
        else return task.priority === this.state.visibility.priority
      })

    return this.props.tasks.length > 0 ? (
      <div id="mapview">
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/outdoors-v9"
        >
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>
          <ControlPanel
            containerComponent={this.props.containerComponent}
            handleChange={this.handleChange}
          />
          {mapTasks.map(task => this._renderMarker(task))}
          {this._renderPopup()}
        </ReactMapGL>
      </div>
    ) : (
      <img
        id="loading"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
      />
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.allTickets
})

const mapDispatchToProps = dispatch => ({
  fetchAllTasks: () => dispatch(getAllTickets())
})

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
