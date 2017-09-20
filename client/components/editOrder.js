import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchOrders, updateOrderStatus } from "../store";
import { connect } from "react-redux";

class EditOrder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <div className="order-container">
        <h1>Orders</h1>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Edit Status</th>
            </tr>
          </thead>

          <tbody>
            {this.props.orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.checkoutDate}</td>
                  <td>{order.status}</td>
                  <td>
                    {
                      <fieldset>
                        <select id="selectOrderStatus">
                          <option value="created">created</option>
                          <option value="completed">completed</option>
                          <option value="processing">processing</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                        <input
                          type="button"
                          value="change status"
                          onclick="updateOrderStatus()"
                        />
                      </fieldset>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  updateOrderStatus: order => {
    dispatch(updateOrderStatus(order));
    ownProps.history.push("/orders");
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
