import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {postReview} from '../store/review';

class ReviewForm extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            star: '',
            comment: ''
        }
        this.addReview = this.props.addReview.bind(this)
    }

    render() {
        let product = this.props.product;
        let addReview = this.props.addReview;
        return (
            <div>
                <form id="review-form" name={product.id} onSubmit={(event) => addReview(event, this.state.star, this.state.comment)}>
                        <div className="form-items form-group">
                        <label htmlFor="exampleSelect1">Your Rating: </label>
                            <select onChange={(event) => this.setState({star: event.target.value })} name="rating" className="form-control" id="star-select">
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
                        <div className="form-items form-group">
                            <label htmlFor="exampleTextarea">Enter Review Here (Must be at least 100 Chars)</label>
                            <textarea onChange={(event) => this.setState({comment: event.target.value })} name="comment" className="form-control" id="exampleTextarea" rows="10"></textarea>
                        </div>
                        {
                            ((!this.state.star.length || this.state.star == 'selected disabled hidden') 
                                || this.state.comment.length < 150) 
                            ? <div>
                                <div className="alert alert-warning" role="alert">
                                    Please enter a Star Rating and Comment Longer Than 100 Characters
                                </div>
                                <button type="submit" className="btn btn-primary" disabled>Submit</button>
                              </div>
                            : <button type="submit" className="btn btn-primary">Submit</button>
                        }
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
        addReview(event, star, comment) {
            const productId = event.target.name;
            let ratingNum = star.split(' ')[0];
            const rating = (ratingNum*2).toString();
            dispatch(postReview(productId, rating, comment))
            // document.getElementById("review-form").reset();
            event.preventDefault()
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