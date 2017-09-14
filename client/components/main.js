import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {getProductsThunk} from '../store/product';
import Navbar from './navbar'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, products} = props
  console.log(props);
  return (
    <div>
      <Navbar />
      <h1>Lake Shopper</h1>
      {/* do category checking below? cant render the all products component in main instead */}
      {
        props.products.map(product => {
          return (
              <div key={product.id}>
                  <h3>{product.name}</h3>
                  {/* DOMS SINGLE PRODUCT GOES HERE */}
              </div>
          )
      })
    }
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to='/home'>Home</Link>
              <a href='#' onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }, 
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
