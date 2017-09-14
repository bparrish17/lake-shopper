import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_FROM_CATEGORY = 'GET_PRODUCTS_FROM_CATEGORY'

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

const getProductsFromCategory = category => ({
    type: GET_PRODUCTS_FROM_CATEGORY,
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

export const getProductsFromCategoryThunk = category =>
  dispatch =>
    axios.get(`api/categories/${category.id}/products`)
      .then(res => res.data)
      .then(products => {
        dispatch(getProductsFromCategory(category))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = products, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCTS_FROM_CATEGORY:
      return action.products;
    default:
      return state
  }
}
