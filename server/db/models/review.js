const Sequelize = require("sequelize");
const db = require("../db");
const Review = db.define(
  "review",
  {
    comments: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
          len: {
              args: [100],
              msg: "Comments must be greater than 100 characters"
          }
      }
    },
    rating: {
      type: Sequelize.ENUM,
      values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      allowNull: false
    }
  }
);

module.exports = Review 
