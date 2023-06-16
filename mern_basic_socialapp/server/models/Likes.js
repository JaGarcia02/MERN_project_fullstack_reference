const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes");
  return Likes;
};
