import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import {getProductsThunk} from '../store/product'
import NavbarRouter from './navbar'
import SingleProduct from './singleProduct'
import ViewCart from './ViewCart'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, products, categories, cart} = props
  //console.log("categories", categories)
  return (
    <div>
      <div id="mycarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="item active">
            <img src="http://rvcoutdoors.com/lake-raystown-resort/wp-content/uploads/2013/11/lake-raystown-resort-pennsylvania.jpg" 
                alt="" 
                className="img-responsive">
            </img>
            <div id="main-caption" className="carousel-caption">
              <strong><em>Lake Shopper</em></strong>
            </div>
          </div>
        </div>
      </div>

      <div className="our-products-container row container-fluid">
      </div>
      <div className="row container-fluid">
      {/* do category checking below? cant render the all products component in main instead */}
      {
        props.products.map(product => {
          return (
            <div className="single-product col-xs-3" key={product.id}>
              <SingleProduct product={product}/>
            </div>
          )
        })
      }
      <br />
      </div>
        <div id="signuplogin" className = "signup navbar-fixed-top navbar-right">
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <Link to='/home'>Home</Link>
                <a href='#' onClick={handleClick}>Logout</a>
              </div>
              : <div id="loginsignup" className="signup">
                {/* The navbar will show these links before you log in */}
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
              </div>
          }
        </div>
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
    products: state.products, 
    cart: state.cart,
    categories: state.categories
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

//<Navbar />

//<img src="http://rvcoutdoors.com/lake-raystown-resort/wp-content/uploads/2013/11/lake-raystown-resort-pennsylvania.jpg" 
// className="img-fluid img-responsive" 
// alt="Responsive image">
// </img>