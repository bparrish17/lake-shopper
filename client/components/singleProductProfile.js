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
                            <div className="col-xs-6">
                                <img src={`${product.image}`} />
                            </div>
                            <div className="col-xs-6">
                            <span>Name: {product.name} Price: {product.price} Description: {product.description}
                                <button type="button" className="btn btn-outline-info">Add To Cart</button>
                                <NavLink to={`/products/${product.id}`} activeClassName="active">
                                    <button type="button" className="btn btn-outline-info">Checkout</button>
                                </NavLink>
                            </span>
                            </div>
                        </ul>
                        <div className="col-xs-6">
                            <h3>Reviews</h3>
                            {
                                reviews.map(review => {
                                    return (
                                        <div key={review.id}>
                                            <SingleReview review={review} />
                                        </div>
                                    )
                                })
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