import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {postReview} from '../store/review';

const ReviewForm = (props) => { 
    let product = props.product;
    let addReview = props.addReview;
    return (
        <div>
            <form id="review-form" name={product.id} onSubmit={addReview}>
                    <div className="form-group">
                    <label htmlFor="exampleSelect1">Your Rating: </label>
                        <select name="rating" className="form-control" id="star-select">
                            <option value="selected disabled hidden">Choose a Rating: </option>
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
                        <label htmlFor="exampleTextarea">Enter Review Here (Must be at least 150 Chars)</label>
                        <textarea name="comment" className="form-control" id="exampleTextarea" rows="10"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
      );
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
        addReview(event) {
            event.preventDefault()
            const productId = event.target.name;
            let ratingNum = event.target.rating.value.split(' ')[0];
            if(ratingNum == 'selected') alert('Please Rate This Item to Submit Review');
            const rating = (ratingNum*2).toString();
            const comment = event.target.comment.value;
            dispatch(postReview(productId, rating, comment))
            document.getElementById("review-form").reset();
        }
    }
}

const ReviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewForm);

export default ReviewFormContainer;


//<ul className="review-list">
//<div class="card">
// <div class="card-block">
// <h4 class="card-title">Card title</h4>
// <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
// <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//<div className="form-group">
// <label htmlFor="email">Email address</label>
// <input type="email" name="email" className="form-control" id="input-email" placeholder="Enter email"></input>
// </div>