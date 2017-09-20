const Sequelize = require("sequelize");
const db = require("../db");

const OrderCart = db.define("orderCart", {
  cartItems: Sequelize.ARRAY(Sequelize.INTEGER),
});

module.exports = OrderCart;