import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import SingleProduct from './singleProduct'
import {removeItemThunk} from '../store/cart';
const _ = require('lodash');
const countBy = require('lodash.countby')

const ViewCart = (props) => { 
    //get count of number of each item
    const cartQuantities = _.countBy((Array.prototype.slice.call(props.cart)), 'id')
    const removeItem = props.removeItem;
    // console.log('REMOVE ITEM', removeItem);
    //on rendering the products through the map, we want each product to be unique,
    //but it doesn't like that because it thinks limiting products to the id is an
    //issue, find solution to this that removes error instead of cartQuantities hack
    return (
        <div>      
            <div id="temp">
            </div>
            <div className="row container-fluid">
                <div className="col-xs-8">
                <h1 id="your-cart-header">Your Cart</h1>
                {
                    props.cart.map(product => {
                        return (
                            <ul className="cart-item-list list-group" key={product.id}>
                                <li className="cart-item-name list-group-item">{product.name}</li>
                                <li className="cart-quantity-input input-group">
                                    <span className="input-group-addon">#</span>
                                        <input 
                                        type="text" 
                                        className="input-quantity form-control" 
                                        defaultValue={cartQuantities[product.id]}>
                                        </input>
                                    <span className="input-group-addon">Quantity</span>
                                </li>
                                <li 
                                    className="cart-item-delete btn btn-danger remove btn-circle"
                                    onClick={() => removeItem(product.id)}
                                    >Remove Item</li>
                            </ul>
                        )
                    })
                }
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

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem(id) {
            dispatch(removeItemThunk(id))
        }
    }
}

const ViewCartContainer = connect(mapStateToProps, mapDispatchToProps)(ViewCart);
export default ViewCartContainer;