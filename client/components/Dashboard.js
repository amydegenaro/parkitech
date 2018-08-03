import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
function getLocation() {
  const location = {}
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by this browser!')
  }
  //This will make appear a pop up asking for permission
  navigator.geolocation.getCurrentPosition(showPosition, error)
  //In case the permission is granted
  function showPosition(position) {
    location.lat = position.coords.latitude
    location.long = position.coords.longitude
  }
  //In case the permission is denied
  function error() {
    alert(
      'Unable to retrieve your location! Allow the browser to share your location.'
    )
  }
  return location
}

export const UserHome = props => {
  const {email} = props
  getLocation()

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div>
        {/* <p>
          Your location is:{' '}
          {location.lat
            ? `${location.lat}, ${location.long}`
            : 'Loading coords...'}
        </p> */}
        {/* <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a> */}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
