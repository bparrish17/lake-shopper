import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

const editStatus = order => {
  return {
    type: UPDATE_ORDER_STATUS,
    order
  }
}

export const fetchOrders = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(result => result.data)
  .then(orders => {
    dispatch(getOrders(orders))
  })
  .catch(error => console.log('Unable to fetch orders', error))

export const editOrderStatus = (order) =>
  dispatch =>
  axios.put(`/api/orders/${order.id}`)
  .then(result => result.data)
  .then(cart => {
    dispatch(editStatus(cart))
  })
  .catch(error => console.log('Unable to update order status', err))

const initialState = {
  orders: []
}

export default function (state=initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GET_ORDERS:
    newState.orders = action.orders
    break
  case UPDATE_ORDER_STATUS:
    newState.orders.push(newState.cart)
    newState.cart = {}
    break
  default:
    return state
  }
  return newState
}
