import React from "react";
import { connect } from "react-redux";

const Carousel = (props) => {
  const { text } = props;
  return (
    <div id="mycarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="item active">
                <img src="http://rvcoutdoors.com/lake-raystown-resort/wp-content/uploads/2013/11/lake-raystown-resort-pennsylvania.jpg" 
                    alt="" 
                    className="img-responsive">
                </img>
                <div id="main-caption" className="carousel-caption">
                <strong><em>{text}</em></strong>
                </div>
            </div>
        </div>
        <div className="our-products-container row container-fluid"></div>
    </div>
  );
}


export default connect(null, null)(Carousel);