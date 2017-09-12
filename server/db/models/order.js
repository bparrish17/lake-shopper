const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  productList: Sequelize.ARRAY,
  address: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM,
    values: ["created", "completed", "processing", "cancelled"],
    defaultValue: "created"
  },
  subtotal: {
    type: Sequelize.VIRTUAL,
    get() {
      let sum = 0;
      this.productList.forEach(function(product) {
          sum += product[price] * product[quantity]
      });
      return sum;
    }
  },
  checkoutDate: Sequelize.DATE
});

module.exports = Order;
