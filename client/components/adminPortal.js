import React, { Component } from 'react'
import {NavLink, withRouter} from 'react-router-dom'
// import store from '../store'
import {connect} from 'react-redux'
import {getProductsThunk, fetchUsers, fetchOrders} from '../store'


class AdminPortal extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }


  render () {

    console.log('*** ADMIN PORTAL ***')
    console.log(this.props)

    const topPadding = {'padding-top': '100px'}

    // const {products, orders, users} = props

    return (
      <div style={topPadding}>
        <font size='5'>Users</font>
        <table id="userTable" className="table">
          <thead>
            <tr>
              <th>ID #</th>
              <th>Email</th>
              <th>Admin Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.users.map(user => {
                return (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.email}</td>
                    <td>{user.isAdmin}</td>
                    <td>
                      <NavLink to={`users/${user.id}`} >
                        <button type="button" className="btn btn-outline-danger">Update</button>
                      </NavLink>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <font size='5'>Products</font>
        <table id="productTable" className="table">
          <thead>
            <tr>
              <th>ID #</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.map(product => {
                return (
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <NavLink to={`editProduct/${product.id}`} >
                        <button type="button" className="btn btn-outline-danger">Update</button>
                      </NavLink>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <font size='5'>Orders</font>
        <table id="orderTable" className="table">
          <thead>
            <tr>
              <th>ID #</th>
              <th>Status</th>
              <th>Checkout Date</th>
              <th>Update</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.orders.map(order => {
                return (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.status}</td>
                    <td>{order.checkoutDate}</td>
                    <td>
                      <NavLink to={`orders/${order.id}/edit`} >
                        <button type="button" className="btn btn-outline-danger">Update</button>
                      </NavLink>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <NavLink to={'addProduct'} >
          <button type="button" className="btn btn-outline-danger">Add Product</button>
        </NavLink>
        <NavLink to={'addCategory'} >
          <button type="button" className="btn btn-outline-danger">Add Category</button>
        </NavLink>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    orders: state.orders,
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(fetchOrders())
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(AdminPortal)
