import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, ProductList, ViewCart, Checkout, SingleReview, ReviewForm, AdminPortal, SingleProductProfile, EditProduct, AddProduct, AddCategory, SingleCategory, SingleUser} from './components'
import NavbarRouter from './components/navbar'
import {me, getProductsThunk, fetchCategories, getCartItemsThunk, fetchReviews} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }


  render () {
    const {isLoggedIn, products, categories} = this.props
    return (
      <Router history={history}>
        <div>
          <NavbarRouter categories={categories}/>
          <div>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/home" component={Main} />
                <Route exact path="/cart" component={ViewCart} />
                <Route exact path="/admin" component={AdminPortal} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path = "/signup" component={Signup} />
                <Route exact path = "/login" component={Login} />
                <Route exact path="/addProduct" component={AddProduct} />
                <Route exact path="/addCategory" component={AddCategory} />
                <Route path="/editProduct/:productId" component={EditProduct} />
                <Route path="/products/:productId" component={SingleProductProfile} />
                <Route path="/categories/:categoryId" component={SingleCategory} />
                <Route path="/users/:userId" component={SingleUser} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    products: state.products,
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(getProductsThunk())
      dispatch(fetchCategories())
      dispatch(getCartItemsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  //products: PropTypes.INSERT_TYPE_HERE.isRequired,
  //categories: PropTypes.INSERT_TYPE_HERE.isRequired,
}

//LOG IN STUFF TAKEN OUT OF RENDER METHOD AND PLACED HERE FOR NOW

// {/* Routes placed here are available to all visitors */}
// <Route path='/login' component={Login} />
// <Route path='/signup' component={Signup} />
// {
//   isLoggedIn &&
//     <Switch>
//       {/* Routes placed here are only available after logging in */}
//       <Route path='/home' component={UserHome} />
//     </Switch>
// }
// {/* Displays our Login component as a fallback */}
// <Route component={Login} />

// // <Route exact path = "/reviewtest" component={SingleReview} />
