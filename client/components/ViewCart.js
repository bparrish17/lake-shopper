import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';


function ViewCart (props) {
  return (
    <div>      
        <h1>Hello World</h1>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
    }
};

const ViewCartContainer = connect(mapStateToProps)(ViewCart);

export default ViewCartContainer;