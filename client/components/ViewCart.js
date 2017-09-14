import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
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
                <h1>Your Cart</h1>
                {
                    props.cart.map(product => {
                        return (
                            <div className="col-xs-3" key={product.id}>
                                <SingleProduct product={product}/>
                            </div>
                        )
                    })
                }
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