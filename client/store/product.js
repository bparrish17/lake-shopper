import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const products = [];

/**
 * ACTION CREATORS
 */
const getProducts = products => ({
    type: GET_PRODUCTS, 
    products
});

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () =>
  dispatch =>
    axios.get('api/products')
      .then(res => res.data)
      .then(products => {
        dispatch(getProducts(products))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = products, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state
  }
}
