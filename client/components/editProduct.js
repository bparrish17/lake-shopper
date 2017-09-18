import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';

function EditProduct (props) {
  const {products, addToCart} = props;
  let product = props.product;

  let productId = this.props.match.params.id

  return (
    <div>
        <li id="product-comp">
            <h3 id="product-name-price">{product.name}</h3>
            <img src={`${product.image}`} className="img-responsive"/>
            <h4 id="product-name-price">${product.price}</h4>
            <div className="row container-fluid">
                <button
                type="button"
                id="add-to-cart-btn"
                className="btn btn-outline-info"
                onClick={() => addToCart(product.id)}
                >Add To Cart</button>

                <NavLink to={`/product/${product.id}`} activeClassName="active">
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
        newProductName: state.newProductName,
        newPrice: state.newPrice,
        newDescription: state.newDescription,
        newImage: state.newImage,
        newQuantity: state.newQuantity      
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      addToCart(id) {
        dispatch(addToCartThunk(id))
      }
    }
}

const EditProductContainer = connect(mapStateToProps, mapDispatchToProps)(EditProduct);

export default EditProductContainer;


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
