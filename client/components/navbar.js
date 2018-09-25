import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function toggleNav() {
  var nav = document.getElementById('myTopNav')
  if (nav.className === 'topnav') {
    nav.className += ' responsive'
  } else {
    nav.className = 'topnav'
  }
}

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    <Link to="/home">
      <h2 id="header">parkitech</h2>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div className="topnav" id="myTopNav">
          {/* The navbar will show these links after you log in */}
          <a href="#">Menu</a>
          <Link to="/home">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/map">Map</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <a href="#" className="icon" onClick={toggleNav}>
            <i className="fa fa-bars" />
          </a>
        </div>
      ) : (
        <div className="topnav" id="myTopNav">
          {/* The navbar will show these links before you log in */}
          <a href="#">Menu</a>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <a href="#" className="icon" onClick={toggleNav}>
            <i className="fa fa-bars" />
          </a>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
