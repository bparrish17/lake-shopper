import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Category from "../store/category";
import {logout} from "../store";

function Navbar(props) {
  console.log("props", props);
  const {isLoggedIn, handleClick, handleRemoveCart} = props;

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="dropdown">
        <button
          className="btn btn-default dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Categories
          <span className="caret" />
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
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
      </div>
      <div className="cartDisplay" id="cartdiv">
     
      <NavLink to="/cart">
      <button type="button" className="btn btn-default btn-sm">
        <span className="glyphicon glyphicon-shopping-cart" />{" "}
        {props.cart.length > 0 ? (
          `${props.cart.length} Item(s) in Cart`
        ) : (
          "No Items in Cart"
        )}
      </button>
    </NavLink>
      </div>
      <div className="homeButton" id="homebuttondiv">
        <NavLink to="/">
          <button type="button" className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-home" /> Home
          </button>
        </NavLink>
      </div>
      <div id="signuplogin" className="signup navbar-fixed-top navbar-right">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <a href="#" onClick={handleClick}>
            <button type="button" className="btn btn-default btn-sm" >
          <span className="glyphicon glyphicon-log-out"></span> Log out
        </button>
            </a>
          </div>
        ) : (
          <div id="loginsignup" className="signup">
            {/* The navbar will show these links before you log in */}
            <NavLink to="/login">
              {" "}
              <button type="button" className="btn btn-default btn-sm">
                <span className="glyphicon glyphicon-log-in" /> Log in
              </button>
            </NavLink>
       
            
            <NavLink to="/signup">  <button type="button" className="btn btn-default btn-sm">
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
