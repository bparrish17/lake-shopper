import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
// import {addToCartThunk} from '../store/cart';

function SingleReview (props) {
    let product = props.product;
    return (
        <div>      
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Card title</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
      addToCart(id) {
        dispatch(addToCartThunk(id))
      }
    }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default SingleProductContainer;