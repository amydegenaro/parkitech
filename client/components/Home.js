import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getWeather} from '../store'

class UserHome extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.location.length > 0) {
      this.props.fetchWeather(this.props.location)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchWeather(this.props.location)
    }
  }

  render() {
    const {email, fetchWeather, weather} = this.props

    return (
      <div id="dash" className="main">
        <h3>Welcome, {email}</h3>
        {weather.daily ? (
          <div>
            <div>
              <h1>{Math.round(weather.currently.temperature)}&#176;F</h1>
              <p>{weather.daily.summary}</p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => getWeather(fetchWeather(this.props.location))}
            >
              Update
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => getWeather(fetchWeather(this.props.location))}
          >
            Get Weather
          </button>
          // <div />
        )}
        <a href="https://darksky.net/poweredby/">
          <h6>Powered by Dark Sky</h6>
        </a>
        <img src="https://static.thenounproject.com/png/132930-200.png" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
  location: state.location,
  weather: state.weather
})

const mapDispatch = dispatch => ({
  fetchWeather: coords => dispatch(getWeather(coords))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
