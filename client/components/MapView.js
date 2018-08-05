import React, {Component} from 'react'
import ReactMapGL, {NavigationControl} from 'react-map-gl'

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
        zoom: 11
      }
    }
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

  render() {
    return (
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
        </ReactMapGL>
      </div>
    )
  }
}

export default MapView
