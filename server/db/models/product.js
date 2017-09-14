const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define(
  "product",
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      defaultValue:
        "http://www.familypoolfun.com/images/toys_swimaids/nt240.jpg",
    },
    description: { 
        type: Sequelize.TEXT, 
        allowNull: false 
    },
    quantity: { 
        type: Sequelize.INTEGER, 
        allowNull: false 
    }
});

//get average rating instance method

//add a changing inventory quantity instance method


module.exports = Product;
