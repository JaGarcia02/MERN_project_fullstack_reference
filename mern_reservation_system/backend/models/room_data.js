module.exports = (sequelize, DataTypes) => {
  const room_data = sequelize.define(
    "room_data",
    {
      ID: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      room_available: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_price: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      room_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      room_desc: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      room_pic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      room_pax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_total_available: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      room_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );

  return room_data;
};
