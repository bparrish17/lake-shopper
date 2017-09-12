const Sequelize = require("sequelize");
const db = require("../db");

const Category = db.define("category", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Category;
