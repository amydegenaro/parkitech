import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

class MapView extends Component {
  constructor() {
    super()
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5
    }
    this.map = {}
  }

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYW15ZGVnZW5hcm8iLCJhIjoiY2prY29uaXpkMThpdjN3bWltNXN1MjdnZCJ9.PoBLx3hpU-M2Ls-jJF-Qtg'

    const {lng, lat, zoom} = this.state

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    })

    this.map.on('move', () => {
      const {lng, lat} = this.map.getCenter()

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      })
    })
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    }

    return <div style={style} ref={el => (this.mapContainer = el)} />
  }

  // render() {
  //   const {lng, lat, zoom} = this.state

  //   return (
  //     <div>
  //       <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
  //         <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
  //       </div>
  //       <div
  //         ref={el => (this.mapContainer = el)}
  //         className="absolute top right left bottom"
  //       />
  //     </div>
  //   )
  // }
}

// ReactDOM.render(<MapView />, document.getElementById('map'))
export default MapView

// https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a
// https://blog.mapbox.com/mapbox-gl-js-in-a-reactive-application-e08eecf0221b
// https://github.com/uber/react-map-gl
// https://www.mapbox.com/mapbox-gl-js/api/
