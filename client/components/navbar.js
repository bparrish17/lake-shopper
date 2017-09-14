import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Category from "../store/category";



function Navbar (props) {
  console.log("props.categories", props.categories)
  console.log("navbar was hit")
  // cons
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
      <h1>MADE TO NAVBAR</h1>
        {props.categories.map(category => {
          <li key={category.id}>
            <h1>{category.name}</h1>
          </li>
        })}
      </div>
    </nav>
    );
  }
const mapStateToProps = (state, ownProps) => {
  return ({
    categories: state.categories,
  });
};
  
const NavbarRouter =  withRouter(connect(mapStateToProps)(Navbar));
export default NavbarRouter;

// {Categories.map(category => {
//   <li key={category.id}>
//     <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
//   </li>
// })}
//<NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
