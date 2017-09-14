import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';


function SingleProductProfile (props) {

    const {products, categories} = props;

    let filteredArr = products.filter((product) => {
        if(product.id === Number(props.match.params.productId)){
            return product;
        }
    })

    //get categories for products
    //let productCategory = categories.filter(category => category.id === filteredArr[0].categoryId)[0].name;
    

  return (
    <div>
       <ul>
           {   

               filteredArr.map(product => {
                   
               return (
                   <li key={product.id}>
                       <img src={`${product.image}`} />
                     <span>Name: {product.name} Price: {product.price} Description: {product.description}
                        <button type="button" className="btn btn-outline-info">Add To Cart</button>
                        <NavLink to={`/product/${product.id}`} activeClassName="active">
                        <button type="button" className="btn btn-outline-info">Checkout</button>
                        </NavLink >
                     </span>
                     
                   </li>
                
               )
           })}
         
       </ul> 
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        categories: state.categories,
    }
};

const SingleProductContainer = connect(mapStateToProps)(SingleProductProfile);

export default SingleProductContainer;