const { DataTypes, sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const task_data = sequelize.define("task_data", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task_Text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return task_data;
};
