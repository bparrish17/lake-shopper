import React, { Component } from 'react'
import {NavLink, withRouter} from 'react-router-dom'
// import store from '../store'
import {connect} from 'react-redux'

function AdminPortal (props) {
  const {products, orders, users} = props

  console.log('*** ADMIN PORTAL ***')
  console.log(props)
  console.log('git')

  return (
    <div>
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
          {/*
            users.map(user => {
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
          */}
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
            props.products.map(product => {
              return (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <NavLink to={`product/${product.id}/edit`} >
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
            orders.map(order => {
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
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    orders: state.orders,
    products: state.products
  }
}

// const mapDispatchToProps = function (dispatch, ownProps) {
//   return {
//     handleChange(evt) {
//       dispatch(writeChannelName(evt.target.value));
//     },
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const name = evt.target.channelName.value;
//       dispatch(postChannel({ name }, ownProps.history));
//       dispatch(writeChannelName(''));
//     }
//   };
// };

export default connect(mapStateToProps)(AdminPortal)
