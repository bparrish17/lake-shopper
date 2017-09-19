import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
// import {addToCartThunk} from '../store/cart';

function SingleReview (props) {
    let review = props.review;
    return (
        <div>      
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Review {review.id}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Rating: {review.rating} Stars</h6>
                    <p className="card-text">{review.comments}</p>
                </div>
            </div>
            <hr />
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
      fetchReviews(id) {
        dispatch(addToCartThunk(id))
      }
    }
}

const SingleReviewContainer = connect(mapStateToProps, mapDispatchToProps)(SingleReview);

export default SingleReviewContainer;