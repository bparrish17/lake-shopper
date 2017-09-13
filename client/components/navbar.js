import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Category from "../store/category";

// export default class Navbar extends Component {
//   render() {
//     return (
//       <div>
//         <ul id="categoryDropdown" className="dropdownContent">
//           {Categories.map(category => {
//             <li key={category.id}>
//               <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
//             </li>
//           })}
//         </ul>
//       </div>
//     );
//   }
// }
