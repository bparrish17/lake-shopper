import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import CartItem from './CartItem';

const ViewCart = (props) => { 
    let totalCart = Array.prototype.splice.call(props.cart);
    let total = 0;
    for(var i=0; i<props.cart.length; i++) {
        total += (props.cart[i].cartQuantity*props.cart[i].price)
    }
    return (
        <div>      
            <div className="temp">
            </div>
            <div className="col-xs-1"></div>
            <div className="row container-fluid">
                <div className="col-xs-9">
                <h1 id="your-cart-header">Your Cart</h1>
                <hr />
                {
                    props.cart.map(product => {
                        return (
                            <div key={product.id}>
                                <CartItem product={product} />
                            </div>
                        )
                    })
                }
                <hr />
                <ul className="cart-item-list list-group">
                    <NavLink to="/checkout" activeClassName="active">
                    <li className="cart-checkout btn btn-primary">Checkout</li>
                    </NavLink>
                    <li className="cart-subtotal input-group">
                        <span className="input-group-addon">$</span>
                            <input 
                            type="text" 
                            className="input-quantity form-control" 
                            value={total}
                            readOnly>
                            </input>
                        <span className="cart-total input-group-addon">Total</span>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        cart: state.cart
    }
};

const ViewCartContainer = connect(mapStateToProps)(ViewCart);
export default ViewCartContainer;


//EDIT/REMOVE FUNCTIONALITY MOVED TO CARTITEM
// const removeItem = props.removeItem;
// const editItem = props.editItem;

// const mapDispatchToProps = (dispatch) => {
//     return {
//         removeItem(id) {
//             dispatch(removeItemThunk(id))
//         }, 
//         editItem(event) {
//             event.preventDefault();
//             let quantity = Number(event.target.value);
//             let productId = event.target.name;
//             dispatch(editItemThunk(productId, quantity));
//         }
//     }
// }