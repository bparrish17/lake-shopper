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
      type: Sequelize.STRING,
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
        type: Sequelize.INTEGER, 
        allowNull: false 
    },
    category: {
      type: Sequelize.ARRAY(Sequelize.STRING)
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

const orderProduct = db.define('orderProduct', {
  orderPrice: Sequelize.DECIMAL
});

module.exports = Product;
