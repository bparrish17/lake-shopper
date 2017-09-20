import axios from "axios";

const defaultOrderCart = []
/**
 * ACTION TYPES
 */
const GET_ORDERCARTS = "GET_ORDERCARTS";
const GET_ORDERCART = "GET_ORDERCART";
const ADD_ORDERCART = "ADD_ORDERCART";

/**
 * ACTION CREATORS
 */
const getOrderCarts = orders => {
  return {
    type: GET_ORDERCARTS,
    orders
  };
};

const getOrderCart = order => {
  return {
    type: GET_ORDERCART,
    order
  };
};

const addOrderCart = order => {
  return {
    type: ADD_ORDERCART,
    order
  };
};


/**
 * THUNK CREATORS
 */
export const fetchOrderCarts = orderCarts => dispatch =>
  axios
    .get('/api/orders')
    .then(result => result.data)
    .then(orderCarts => {
      dispatch(getOrderCarts(orders));
    })
    .catch(error => console.log("Unable to fetch orders", error));

export const fetchOrderCart = orderCart => dispatch =>
  axios
    .get(`/api/orders/${orderCart.id}`)
    .then(result => result.data)
    .then(orderCart => {
      dispatch(getOrderCart(orderCart));
    })
    .catch(error => console.log("Unable to fetch order", error));

export const postOrderCart = orderCart => {
    console.log('orderCart', orderCart)
  return dispatch => {
    return axios.post('/api/ordercart', {cartItems: orderCart})
    .then(result => result.data)
    .then(newOrderCart => {
      dispatch(addOrderCart(newOrderCart));
    })
    .catch(error => console.log("Unable to add order", error));
  }

}

/**
 * REDUCER
 */
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERCARTS:
      return action.orderCarts;
    case GET_ORDERCART:
      return action.orderCart;
    case ADD_ORDERCART:
      return [...state, action.orderCart];
    default:
      return state;
  }
}