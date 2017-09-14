import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Category from "../store/category";



function Navbar (props) {
  console.log("props.categories", props.categories)
  console.log("navbar was hit")
  const {categories} = props;
    return (
      <div>
        <ul id="categoryDropdown" className="dropdownContent">
          {props.categories.map(category => {
            <li key={category.id}>
              <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
            </li>
          })}
        </ul>
      </div>
    );
  }
const mapStateToProps = (state, ownProps) => {
  return ({
    categories: state.categories,
  });
};
  
const NavbarRouter =  withRouter(connect(mapStateToProps)(Navbar));
export default NavbarRouter 
=======
// {Categories.map(category => {
//   <li key={category.id}>
//     <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
//   </li>
// })}
