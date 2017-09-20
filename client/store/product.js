import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
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

const addProduct = product => ({
    type: ADD_PRODUCT,
    product
});

const editProduct = product => ({
    type: EDIT_PRODUCT,
    product
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
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        dispatch(getProducts(products))
      })
      .catch(err => console.log(err))

export const postProduct = (product) =>
  dispatch =>
    axios.post('/api/products', product)
      .then(res => res.data)
      .then(product => {
        dispatch(addProduct(product))
      })
      .catch(err => console.log(err))

export const updateProduct = (product) =>
  dispatch =>
    axios.put(`/api/products/${product.id}`, product)
      .then(res => res.data)
      .then(product => {
        dispatch(editProduct(product))
      })
      .catch(err => console.log(err))

export const getProductsFromCategoryThunk = category =>
  dispatch =>
    axios.get(`/api/categories/${category.id}/products`)
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
    case ADD_PRODUCT:
      return [...state, action.product];
    case GET_PRODUCTS_FROM_CATEGORY:
      return action.products;
    default:
      return state
  }
}
