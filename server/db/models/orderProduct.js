const Sequelize = require("sequelize");
const db = require("../db");
const Product = require('./product');

const orderProduct = db.define('orderProduct', {
    orderPrice: {
      type: Sequelize.DECIMAL,
      values: 1.0
    },
    orderQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
  });

module.exports = orderProduct;