import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Category from "../store/category";
import {logout} from "../store";

function Navbar(props) {
  console.log("props", props);
  const {isLoggedIn, handleClick, handleRemoveCart} = props;

  return (
    <nav id="navbar" className="navbar navbar-default navbar-fixed-top">
      <button
        className="navbar-buttons btn btn-default dropdown-toggle"
        type="button"
        id="category-button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <span id="category-caret" className="caret" /> Categories 
      </button>
      <ul id="category-dropdown" className="dropdown-menu" aria-labelledby="dropdownMenu1">
        {props.categories.map(category => {
          return (
            <li key={category.id.toString()}>
              <NavLink to={`/categories/${category.id}`}>
                {category.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="navbar-headers cartDisplay" id="cartdiv">
        <NavLink to="/cart">
          <button type="button" className="navbar-buttons btn btn-default btn-sm">
            <span className="glyphicon glyphicon-shopping-cart" />{" "}
            {props.cart.length > 0 ? (
              `${props.cart.reduce((acc, el) => { return acc.cartQuantity + el.cartQuantity })} Item(s) in Cart`
            ) : (
              "No Items in Cart"
            )}
          </button>
        </NavLink>
      </div>

      <div className="navbar-headers homeButton" id="homebuttondiv">
        <NavLink to="/">
          <button type="button" id="home-button" className="navbar-buttons btn btn-default btn-sm">
            <span className="glyphicon glyphicon-home" /> Home
          </button>
        </NavLink>
      </div>
      <div id="signuplogin" className="navbar-headers signup">
        {isLoggedIn ? (
            <button type="button" className="login-buttons navbar-buttons btn btn-default btn-sm" onClick={handleClick}>
              <span className="glyphicon glyphicon-log-out"></span> Log out
            </button>
        ) : (
          <div id="loginsignup" className="signup">
            {/* The navbar will show these links before you log in */}
            <NavLink to="/login">
              {" "}
              <button type="button" className="login-buttons navbar-buttons btn btn-default btn-sm">
                <span className="glyphicon glyphicon-log-in" /> Log in
              </button>
            </NavLink>
       
            
            <NavLink to="/signup">  <button type="button" className="login-buttons navbar-buttons btn btn-default btn-sm">
          <span className="glyphicon glyphicon-user"></span> Sign-Up 
          </button></NavLink>
        </div>
        )}
      </div>
    </nav>

  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    cart: state.cart,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }, 
  }
}

const NavbarRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
export default NavbarRouter;

// {Categories.map(category => {
//   <li key={category.id}>
//     <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
//   </li>
// })}
//<NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
