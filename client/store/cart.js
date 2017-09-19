import axios from "axios";

let cart = [];

/**
 * ACTION TYPES
 */
//const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const GET_CART = "GET_CART";
const REMOVE_ITEM = "REMOVE_ITEM";
const ADD_TO_CART = "ADD_TO_CART";
const EDIT_ITEM_QUANTITY = "EDIT_ITEM_QUANTITY";
const EDIT_ITEM_FAILURE = "EDIT_ITEM_FAILURE";
const DELETE_CART = "DELETE_CART";

/**
 * ACTION CREATORS
 */
const getCart = cart => {
  return {
    type: GET_CART,
    cart
  };
};

const removeItem = cart => {
  return {
    type: REMOVE_ITEM,
    cart
  }
}

const addToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}

const editItem = cart => {
  return {
    type: EDIT_ITEM_QUANTITY,
    cart
  }
}

const editItemFailure = error => {
  return {
    type: EDIT_ITEM_FAILURE,
    error
  }
}

const deleteCart = cart => {
  return {
    type: DELETE_CART,
    cart
  }
}

/**
 * THUNK CREATORS
 */
export const getCartItemsThunk = () => 
    dispatch =>
        axios.get('/api/cart')
        .then(result => result.data)
        .then(ourCart => {
            dispatch(getCart(ourCart));
        })

export const removeItemThunk = (itemId) => 
    dispatch => 
        axios.delete(`/api/cart/${itemId}`)
        .then(result => result.data)
        .then(ourCart => {
          let cart = Array.prototype.slice.call(ourCart);
          let newCart = [];
          for(var i=0; i<cart.length; i++) {
            if(cart[i].id !== itemId) {
              newCart.push(cart.slice(i,i+1)[0]);
            }
          }
          dispatch(removeItem(newCart))
        })

export const addToCartThunk = (itemId) => 
    dispatch => 
      axios.post(`/api/cart/${itemId}`)
      .then(result => result.data)
      .then(ourCart => {
          dispatch(addToCart(ourCart));
      })

export const editItemThunk = (itemId, newQuantity) => 
    dispatch => 
      axios.put(`/api/cart/${itemId}`, {newQuantity})
      .then(result => result.data)
      .then(ourCart => {
        dispatch(editItem(ourCart))
      })
      .catch(err => {
        dispatch(editItemFailure(err));
      })

//remove entire cart after submit

export const removeCart = () => {
  return dispatch => {
    return axios.delete('/api/cart/')
    .then(result => result.data)
    .then(empty => {
      dispatch(deleteCart(empty))
    })
}
}

/**
 * REDUCER
 */
export default function reducer(state = cart, action) {
  switch (action.type) {
    case GET_CART: 
      return action.cart;
    case REMOVE_ITEM:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    case EDIT_ITEM_QUANTITY:
      return action.cart;
    case DELETE_CART:
      return action.cart;
    case EDIT_ITEM_FAILURE:
      return action.error;
    default:
      return state;
  }
}