import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import SingleProduct from './singleProduct'

const ViewCart = (props) => { 
    //NEED TO FIND COUNT OF EACH OF THE PRODUCTS TO RETURN QUANTITY
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
                                        <input type="text" className="input-quantity form-control" aria-label="Change Quantity"></input>
                                    <span className="input-group-addon">Quantity</span>
                                </li>
                                <li className="cart-item-delete btn btn-danger remove btn-circle">Remove Item</li>
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

const ViewCartContainer = connect(mapStateToProps)(ViewCart);
export default ViewCartContainer;