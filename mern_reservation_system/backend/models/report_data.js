module.exports = (sequelize, DataTypes) => {
  const report_data = sequelize.define(
    "report_data",
    {
      ID: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      monthYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberData: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return report_data;
};
