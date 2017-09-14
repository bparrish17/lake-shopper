import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Category from "../store/category";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <ul id="categoryDropdown" className="dropdownContent">
          <h1>Hello World</h1>
        </ul>
      </div>
    );
  }
}

