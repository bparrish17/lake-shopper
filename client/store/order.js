import axios from "axios";

const defaultOrders = []
/**
 * ACTION TYPES
 */
const GET_ORDERS = "GET_ORDERS";
const GET_ORDER = "GET_ORDER";
const ADD_ORDER = "ADD_ORDER";

/**
 * ACTION CREATORS
 */
const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  };
};

const getOrder = order => {
  return {
    type: GET_ORDER,
    order
  };
};

const addOrder = order => {
  return {
    type: ADD_ORDER,
    order
  };
};


/**
 * THUNK CREATORS
 */
export const fetchOrders = orders => dispatch =>
  axios
    .get('/api/orders')
    .then(result => result.data)
    .then(orders => {
      dispatch(getOrders(orders));
    })
    .catch(error => console.log("Unable to fetch orders", error));

export const fetchOrder = order => dispatch =>
  axios
    .get(`/api/orders/${order.id}`)
    .then(result => result.data)
    .then(order => {
      dispatch(getOrder(order));
    })
    .catch(error => console.log("Unable to fetch order", error));

export const postOrder = order => dispatch =>
  axios
    .post('/api/orders', order)
    .then(result => result.data)
    .then(newOrder => {
      dispatch(addOrder(newOrder));
    })
    .catch(error => console.log("Unable to add order", error));

/**
 * REDUCER
 */
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case GET_ORDER:
      return action.order;
    case ADD_ORDER:
      return [...state, action.order];
    default:
      return state;
  }
}
