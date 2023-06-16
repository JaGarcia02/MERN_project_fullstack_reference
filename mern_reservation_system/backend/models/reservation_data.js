module.exports = (sequelize, DataTypes) => {
  const reservation_data = sequelize.define(
    "reservation_data",
    {
      ID: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Date_Start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reservation_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservation_paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservation_roomID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reservation_package: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservation_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return reservation_data;
};
