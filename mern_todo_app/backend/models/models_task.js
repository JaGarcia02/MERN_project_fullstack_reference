module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("tbl_task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    my_task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Task;
};
