import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {ReviewForm} from './index';


function SingleProductProfile (props) {

    const {products, categories, reviews} = props;
    let filteredArr = products.filter((product) => {
        if(product.id === Number(props.match.params.productId)){
            return product;
        }
    })
    console.log("YOU MADE IT", props);
    //get categories for products
    //let productCategory = categories.filter(category => category.id === filteredArr[0].categoryId)[0].name;
    return (
        <div>
        
            {   
                filteredArr.map(product => {
                return (
                    <div>
                        <li key={product.id}>
                            <img src={`${product.image}`} />
                                <span>Name: {product.name} Price: {product.price} Description: {product.description}
                                    <button type="button" className="btn btn-outline-info">Add To Cart</button>
                                    <NavLink to={`/products/${product.id}`} activeClassName="active">
                                        <button type="button" className="btn btn-outline-info">Checkout</button>
                                    </NavLink>
                                </span>
                        </li>
                        <li>
                            <ReviewForm product={product} />
                        </li>
                        </div>
                )
            })}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        categories: state.categories,
        reviews: state.reviews
    }
};

const SingleProductContainer = connect(mapStateToProps)(SingleProductProfile);

export default SingleProductContainer;