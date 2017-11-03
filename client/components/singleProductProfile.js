import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {ReviewForm, SingleReview} from './index';
import {fetchReviews} from '../store/review';


class SingleProductProfile extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.loadReviews(this.props.match.params.productId);
    }
    render() {
        const {products, categories, reviews, isLoggedIn} = this.props;
        let filteredArr = products.filter((product) => {
            if(product.id === Number(this.props.match.params.productId)){
                return product;
            }
        })
        return (
            <div>
            <div className="temp">
            </div>
            {   
                filteredArr.map(product => {
                return (
                    <div key={product.id}>
                        <ul>
                            <div className="product-info-container row container-fluid">
                                <div className="product-img col-xs-6">
                                    <img className="product-img-thumb img-thumbnail" src={`${product.image}`} />
                                </div>
                                <div className="product-info col-xs-6">
                                    <h1><strong>{product.name}</strong></h1>
                                    <h3>${product.price}</h3>
                                    <hr />
                                    <div id="product-description">
                                        <h4>{product.description}</h4>
                                    </div>
                                    <div className="single-product-buttons">
                                        {   !product.quantity 
                                            ? <button type="button" className="btn btn-danger" disabled>Out of Stock</button>
                                            : <button id="profile-add-to-cart" type="button" className="btn btn-outline-info">Add To Cart</button>

                                        }
                                        <NavLink to="/checkout" activeClassName="active">
                                            <button id="checkout-button" type="button" className="btn btn-outline-info">Checkout</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </ul>
                        <hr />
                        <div className="col-xs-6">
                            <h3>Reviews</h3>
                            {reviews.length
                                ? reviews.map(review => {
                                    return (
                                        <div key={review.id}>
                                            <SingleReview review={review} />
                                        </div>
                                    )
                                })
                                : <div id="no-reviews" className="alert alert-info" role="alert">
                                    There Are No Reviews For This Product
                                </div>
                            }
                        </div>
                        <div className="add-review col-xs-6">
                        <div id="review-form-title">
                            <h3>Leave a Review for <strong>{product.name}</strong></h3>
                        </div>
                        { isLoggedIn
                            ? <ReviewForm product={product} />
                            : <div>
                                <div className="alert alert-danger" role="alert">
                                    You must be logged in to submit a review
                                </div>
                              </div>
                        }
                        </div>
                    </div>
                )
            })}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: !!state.user.id,
        products: state.products,
        categories: state.categories,
        reviews: state.reviews
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadReviews(productId) {
            dispatch(fetchReviews(productId))
        },
        handleClick() {
            event.preventDefault();
        }
    }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProductProfile);

export default SingleProductContainer;