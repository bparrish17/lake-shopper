import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';


function SingleProductProfile (props) {

    const {products} = props;

    let filteredArr = products.filter((product) => {
        if(product.id === Number(props.match.params.productId)){
            return product;
        }
    })

    //get student's campus
    //let studentCampus = campusList.filter(campus => campus.id === filteredArr[0].campusId)[0].name;
    
    console.log('studentCampus', studentCampus)
    console.log('***filteredArr', filteredArr);
    console.log('campuslist', campusList)

  return (
    <div>
       <ul>
           {   

               products.map(product => {
                   
               return (
                   <li key={product.id}>
                       <img src={`${product.image}`} />
                     <span>Name: {product.name} Price: {product.price}
                        <button type="button" className="btn btn-outline-info">Add To Cart</button>
                        <NavLink to={`/product/${product.id}`} activeClassName="active">
                        <button type="button" className="btn btn-outline-info">View Details</button>
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