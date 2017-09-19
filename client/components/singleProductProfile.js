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
        const {products, categories, reviews} = this.props;
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
                            <div className="row container-fluid">
                                <div className="col-xs-6">
                                    <img src={`${product.image}`} />
                                </div>
                                <div className="product-info col-xs-6">
                                    <h1>{product.name}</h1>
                                    <h3>${product.price}</h3>
                                    <hr />
                                    <h4>{product.description}</h4>
                                    <div className="single-product-buttons">
                                        <button type="button" className="btn btn-outline-info">Add To Cart</button>
                                        <NavLink to={`/products/${product.id}`} activeClassName="active">
                                            <button type="button" className="btn btn-outline-info">Checkout</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </ul>
                        <hr />
                        <div className="col-xs-6">
                            <h3>Reviews</h3>
                            {
                                reviews.length
                                ? reviews.map(review => {
                                    return (
                                        <div key={review.id}>
                                            <SingleReview review={review} />
                                        </div>
                                    )
                                })
                                : <h3>There are no reviews for this product</h3>
                            }
                        </div>
                        <div className="col-xs-6">
                            <ReviewForm product={product} />
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
        products: state.products,
        categories: state.categories,
        reviews: state.reviews
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadReviews(productId) {
            dispatch(fetchReviews(productId))
        }
    }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProductProfile);

export default SingleProductContainer;