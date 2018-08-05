import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

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
