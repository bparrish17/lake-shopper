import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import SingleProduct from './singleProduct'
import {removeItemThunk, editItemThunk} from '../store/cart';

const ViewCart = (props) => { 
    const removeItem = props.removeItem;
    const editItem = props.editItem;
    // console.log('REMOVE ITEM', removeItem);
    //on rendering the products through the map, we want each product to be unique,
    //but it doesn't like that because it thinks limiting products to the id is an
    //issue, find solution to this that removes error instead of cartQuantities hack
    return (
        <div>      
            <div id="temp">
            </div>
            <div className="row container-fluid">
                <div className="col-xs-9">
                <h1 id="your-cart-header">Your Cart</h1>
                {
                    props.cart.map(product => {
                        return (
                            <ul className="cart-item-list list-group" key={product.id}>
                                <li className="cart-item-name list-group-item">{product.name}</li>
                                <li className="cart-quantity-input input-group">
                                    <span className="input-group-addon">#</span>
                                        <input 
                                        type="text" 
                                        className="input-quantity form-control" 
                                        value={product.cartQuantity}
                                        name={product.id}
                                        onChange={editItem}>
                                        </input>
                                    <span className="input-group-addon">Quantity</span>
                                </li>
                                <li className="cart-price-value input-group">
                                    <span className="input-group-addon">$</span>
                                        <input 
                                        type="text" 
                                        className="input-quantity form-control" 
                                        value={product.price*product.cartQuantity}>
                                        </input>
                                    <span className="input-group-addon">Price</span>
                                </li>   
                                <li 
                                    className="cart-item-delete btn btn-danger remove btn-circle"
                                    onClick={() => removeItem(product.id)}
                                    >Remove Item</li>
                            </ul>
                        )
                    })
                }
                <ul className="cart-item-list list-group">
                    <li className="cart-subtotal input-group">
                        <span className="input-group-addon">$</span>
                            <input 
                            type="text" 
                            className="input-quantity form-control" 
                            value={100}>
                            </input>
                        <span className="input-group-addon">Subtotal</span>
                    </li>
                </ul>
                </div>
            </div>
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
        removeItem(id) {
            dispatch(removeItemThunk(id))
        }, 
        editItem(event) {
            let quantity = Number(event.target.value);
            let productId = event.target.name;
            dispatch(editItemThunk(productId, quantity));
        }
    }
}

const ViewCartContainer = connect(mapStateToProps, mapDispatchToProps)(ViewCart);
export default ViewCartContainer;

// <div className="center">
// <li>
//     <div className="cart-quantity-input input-group">
//       <span className="input-group-btn">
          
//       </span>
//       <input type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10">
//       <span class="input-group-btn">
//           <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
//               <span class="glyphicon glyphicon-plus"></span>
//           </button>
//       </span>
//   </li>