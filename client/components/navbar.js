import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div>
            <Link to="/products">
              m<i className="fas fa-coffee" />gsy
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          <div className="nav-item">
            <Link to="/profile">
              <i className="fas fa-user fa-lg  " />{' '}
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/cart">
              <i className="fas fa-shopping-cart fa-lg" />
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="nav-item">
              {/* The navbar will show these links after you log in */}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <>
              <div className="nav-item">
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
              </div>
              <div className="nav-item">
                <Link to="/signup">Sign Up</Link>
              </div>
            </>
          )}
        </div>
      </div>
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
