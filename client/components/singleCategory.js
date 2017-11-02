import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {ReviewForm} from './index';
import SingleProduct from './singleProduct';
import Carousel from './carousel';

function SingleCategory(props) {
  const { categories } = props;
  const categoryId = props.match.params.categoryId;
  let currentCategory = categories.filter(category => category.id == categoryId)[0];
  let prodsinCat = currentCategory ? currentCategory.products : [];
  return (
    <div>
      <Carousel text={currentCategory.name} />
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
