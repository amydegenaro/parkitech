import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getWeather} from '../store'

const getUserWeather = fetchWeather => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        fetchWeather([pos.coords.latitude, pos.coords.longitude])
      },
      () => {
        alert('Unable to retrieve location')
      },
      {
        enableHighAccuracy: true,
        timeout: 30000
      }
    )
  } else alert('Geolocation not supported')
}

export const UserHome = props => {
  const {email, fetchWeather, weather} = props

  return (
    <div id="dash" className="main">
      <h3>Welcome, {email}</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => getUserLocation(fetchWeather)}
      >
        Get weather
      </button>
      {weather.daily ? (
        <div>
          <h1>{Math.round(weather.currently.temperature)}&#176;F</h1>
          <p>{weather.daily.summary}</p>
        </div>
      ) : (
        <div />
      )}
      <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      <h3>Coming soon:</h3>
      <ul>
        <li>Overview charts on dashboard</li>
        <li>More filtering and icons in map view</li>
        <li>Assign users to specific tasks</li>
        <li>Filter tasks by user</li>
      </ul>
      <img src="https://static.thenounproject.com/png/132930-200.png" />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
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
