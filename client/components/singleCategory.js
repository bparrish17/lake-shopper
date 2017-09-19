import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {ReviewForm} from './index';
import SingleProduct from './singleProduct'
// import Category from "../store/category";

function SingleCategory(props) {
  const { categories } = props;
  const categoryId = props.match.params.categoryId;
  console.log("props", props);
  console.log("categoryId ", categoryId);
  let currentCategory = categories.filter(category => {
    return category.id == categoryId;
  })[0];

  let prodsinCat = currentCategory ? currentCategory.products : [];
  console.log("prodsinCat", prodsinCat);

  return (
    <div>
      <div className="temp">
      </div>
      <div className="row container-fluid">
          {/* do category checking below? cant render the all products component in main instead */}
          {
            prodsinCat.map(product => {
              return (
                <div className="single-product col-xs-3" key={product.id}>
                  <SingleProduct product={product}/>
                </div>
              )
            })
          }
          <br />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    products: state.products
  };
};

export default connect(mapStateToProps)(SingleCategory);
