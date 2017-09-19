import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {addToCartThunk} from '../store/cart';

function SingleProduct (props) {
    const {products, cart, addToCart} = props;
    let product = props.product;
    return (
        <div>      
            <li id="product-comp">
                <h3 id="product-name-price">{product.name}</h3>
                <div className="product-image-container">
                    <img src={`${product.image}`} className="product-image img-thumbnail"/>
                </div>
                <h4 id="product-name-price">${product.price}</h4>
                <div className="product-buttons row container-fluid">
                    <button 
                    type="button" 
                    id="add-to-cart-btn" 
                    className="btn btn-outline-info"
                    onClick={() => addToCart(product.id)}
                    >Add To Cart</button>

                    <NavLink to={`/products/${product.id}`} activeClassName="active">
                        <button type="button" id="view-details-btn" className="btn btn-outline-info">View Details</button>
                    </NavLink>
                </div>
            </li>
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


    // let filteredArr = props.studentsList.filter((student) => {
    //     if(student.id === Number(props.match.params.studentId)){
    //         return student;
    //     }
    // })

    //get student's campus
    //let studentCampus = campusList.filter(campus => campus.id === filteredArr[0].campusId)[0].name;
    
    // console.log('studentCampus', studentCampus)
    // console.log('***filteredArr', filteredArr);
    // console.log('campuslist', campusList)
