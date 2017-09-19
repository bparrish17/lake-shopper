import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import SingleProduct from './singleProduct'
import {removeItemThunk, editItemThunk} from '../store/cart';

const CartItem = (props) => { 
    const product = props.product;
    const editItem = props.editItem;
    const removeItem = props.removeItem;
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
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem(id) {
            dispatch(removeItemThunk(id))
        }, 
        editItem(event) {
            event.preventDefault();
            let quantity = Number(event.target.value);
            let productId = event.target.name;
            dispatch(editItemThunk(productId, quantity));
        }
    }
}
const CartItemContainer = connect(mapDispatchToProps)(CartItem);
export default CartItemContainer;
