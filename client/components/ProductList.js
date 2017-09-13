import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = (state) => {
    //will return an empty obj
    return ({
      products: state.products,
    });
  };

//   const mapDispatchToProps = () => {

//   }
  
export const ProductList = (props) => {
    console.log('THESE ARE PROPS', props.products);
    return (
        <div>
            <h1>ProductList Component Says Hey</h1>
            {
                props.products.map(product => {
                    return (
                        <div key={product.id}>
                            <h3>{product.name}</h3>
                        </div>
                    )
                })
            }
        </div>
    );
};
  
  export default withRouter(connect(mapStateToProps)(ProductList));