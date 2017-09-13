import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const products = {
    hello: 'world'
}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({
    type: GET_PRODUCTS, 
    product
});

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () =>
  dispatch =>
    axios.get('/products/')
      .then(res =>
        dispatch(getProducts(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = products, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.product
    default:
      return state
  }
}
