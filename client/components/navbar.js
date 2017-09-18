import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Category from "../store/category";

function Navbar(props) {
  console.log("props", props);
  return (
    <nav>
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
      <a href='/cart'>
        <button type="button" className="btn btn-default btn-sm">
          <span className="glyphicon glyphicon-shopping-cart" />{" "}
          {props.cart.length > 0 ? (
            `${props.cart.length} Items in Cart`
          ) : (
            "No Items in Cart"
          )}
        </button>
        </a>
      </div>

      <div className="homeButton" id="homebuttondiv">
      <a href='/'>
        <button type="button" className="btn btn-default btn-sm">
          <span className="glyphicon glyphicon-home" /> Home
        </button>
        </ a>
      </div>
    </nav>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    cart: state.cart
  };
};

const NavbarRouter = withRouter(connect(mapStateToProps)(Navbar));
export default NavbarRouter;

// {Categories.map(category => {
//   <li key={category.id}>
//     <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
//   </li>
// })}
//<NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
