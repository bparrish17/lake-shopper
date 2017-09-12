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
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    image: {
      type: Sequelize.URL,
      defaultValue:
        "http://www.familypoolfun.com/images/toys_swimaids/nt240.jpg",
      validate: {
        isUrl: true
      }
    },
    description: { 
        type: Sequelize.TEXT, 
        allowNull: false 
    },
    quantity: { 
        type: Sequelize.NUMBER, 
        allowNull: false 
    },
    category: {
      type: Sequelize.ARRAY
    }
  },
  {
    validate: {
      categoryLength() {
        if (this.category.length < 1) {
          throw new Error("Category length must be greater than 1");
        }
      }
    }
  }
);
module.exports = Product;
