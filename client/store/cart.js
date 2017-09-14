import axios from "axios";

let cart = [];

/**
 * ACTION TYPES
 */
//const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const GET_CART = "GET_CART";

/**
 * ACTION CREATORS
 */
const getCart = cart => {
  return {
    type: GET_CART,
    cart
  };
};

/**
 * THUNK CREATORS
 */
export const getCartItemsThunk = () => 
    dispatch =>
        axios.get('/api/cart')
        .then(result => {
            return result.data;
        })
        .then(ourCart => {
            dispatch(getCart(ourCart));
        })

/**
 * REDUCER
 */
export default function reducer(state = cart, action) {
  switch (action.type) {
    case GET_CART: 
      return action.cart;
    // case ADD_PRODUCT_TO_CART:
    //   return action.cart;
    default:
      return state;
  }
}