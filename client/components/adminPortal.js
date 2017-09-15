import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';


function AdminPortal (props) {
    const {users, products, orders} = props;

    console.log('*** ADMIN PORTAL ***')

    return (
      <div>
        <table id="userTable" className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Admin Status</th>
              <th>Password Reset</th>
            </tr>
          </thead>
          <tbody>
            {
              props.users.map(user => {
                return (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.email}</td>
                    <td>{user.isAdmin}</td>
                    <td><button>Password Reset</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <table id="productTable" className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
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
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <table id="orderTable" className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Checkout Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              props.orders.map(order => {
                return (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.status}</td>
                    <td>{order.checkoutDate}</td>
                    <td><button>Order Edit</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users,
        orders: state.orders
    }
};



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

export default connect(mapStateToProps)(AdminPortal);
