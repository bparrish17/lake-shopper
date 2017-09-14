import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';


function SingleProduct (props) {
    const {products} = props;
    let product = props.product;
  return (
    <div>
       <ul id="product-comp">       
            <li>
                <h5>{product.name}</h5>
                <img src={`${product.image}`} className="img-responsive"/>
                <h5>Price: ${product.price}</h5>
                <button type="button" className="btn btn-outline-info">Add To Cart</button>
                <NavLink to={`/product/${product.id}`} activeClassName="active">
                <button type="button" className="btn btn-outline-info">View Details</button>
                </NavLink>
            </li>
       </ul> 
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
    }
};

const SingleProductContainer = connect(mapStateToProps)(SingleProduct);

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
