import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Category from "../store/category";

function Navbar(props) {
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
    </nav>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  };
};

const NavbarRouter = withRouter(connect(mapStateToProps)(Navbar));
export default NavbarRouter;

// {Categories.map(category => {
//   <li key={category.id}>
//     <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
//   </li>
// })}
//
