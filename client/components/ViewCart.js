import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import SingleProduct from './singleProduct'
import {removeItemThunk, editItemThunk} from '../store/cart';

const ViewCart = (props) => { 
    const removeItem = props.removeItem;
    const editItem = props.editItem;
    let totalCart = Array.prototype.splice.call(props.cart);
    let total = 0;
    for(var i=0; i<props.cart.length; i++) {
        console.log(props.cart[i]);
        total += (props.cart[i].cartQuantity*props.cart[i].price)
    }

    // console.log('REMOVE ITEM', removeItem);
    //on rendering the products through the map, we want each product to be unique,
    //but it doesn't like that because it thinks limiting products to the id is an
    //issue, find solution to this that removes error instead of cartQuantities hack
    return (
        <div>      
            <div id="temp">
            </div>
            <div className="col-xs-1"></div>
            <div className="row container-fluid">
                <div className="col-xs-9">
                <h1 id="your-cart-header">Your Cart</h1>
                <hr />
                {
                    props.cart.map(product => {
                        return (
                            <ul className="cart-item-list list-group" key={product.id}>
                                <li className="cart-item-name list-group-item">{product.name}</li>
                                <li className="cart-item-price input-group">
                                    <span className="input-group-addon">$</span>
                                        <input 
                                        type="text" 
                                        className="input-quantity form-control" 
                                        value={product.price}>
                                        </input>
                                    <span className="input-group-addon">Price</span>
                                </li>   
                                <li className="cart-quantity-input input-group">
                                    <span className="input-group-addon">#</span>
                                        <input 
                                        type="text" 
                                        className="input-quantity form-control" 
                                        value={product.cartQuantity}
                                        name={product.id}
                                        onChange={editItem}>
                                        </input>
                                    <span className="input-group-addon">In Cart</span>
                                </li>
                                <li className="cart-item-subtotal input-group">
                                    <span className="input-group-addon">$</span>
                                        <input 
                                        type="text" 
                                        className="input-quantity form-control" 
                                        value={product.price*product.cartQuantity}>
                                        </input>
                                    <span className="input-group-addon">Subtotal</span>
                                </li>   
                                <li 
                                    className="cart-item-delete btn btn-danger remove btn-circle"
                                    onClick={() => removeItem(product.id)}
                                    >Remove Item</li>
                            </ul>
                        )
                    })
                }
                <hr />
                <ul className="cart-item-list list-group">
                    <li className="cart-checkout btn btn-primary">Checkout</li>
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
            <div className="col-xs-2"></div>
            
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        cart: state.cart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem(id) {
            dispatch(removeItemThunk(id))
        }, 
        editItem(event) {
            let quantity = Number(event.target.value);
            let productId = event.target.name;
            dispatch(editItemThunk(productId, quantity));
        }
    }
}

const ViewCartContainer = connect(mapStateToProps, mapDispatchToProps)(ViewCart);
export default ViewCartContainer;
