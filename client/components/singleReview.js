import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
// import {addToCartThunk} from '../store/cart';

class SingleReview extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //fetchReviews(?)
    }
    render() {
        const {products, cart, addToCart, reviews} = props;
        console.log('REVIEW PROPS', props)
        let product = props.product;
        return (
            <div className="col-xs-6">      
                <form>
                    <div className="row container-fluid">
                        <ul>
                        <div className="form-group">
                            <label for="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="input-email" placeholder="Enter email"></input>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                        <label for="exampleSelect1">Your Rating: </label>
                            <select className="form-control" id="star-select">
                                <option>0.5 Stars</option>
                                <option>1 Star</option>
                                <option>1.5 Stars</option>
                                <option>2 Stars</option>
                                <option>2.5 Stars</option>
                                <option>3 Stars</option>
                                <option>3.5 Stars</option>
                                <option>4 Stars</option>
                                <option>4.5 Stars</option>
                                <option>5 Stars</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="exampleTextarea">Enter Review Here (Must be at least 150 Chars)</label>
                            <textarea className="form-control" id="exampleTextarea" rows="10"></textarea>
                        </div>
                        </ul>
                    </div>
                </form>
            </div>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        cart: state.cart,
        reviews: state.reviews
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const SingleReviewContainer = connect(mapStateToProps, mapDispatchToProps)(SingleReview);

export default SingleReviewContainer;