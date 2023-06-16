module.exports = (sequelize, DataTypes) => {
  const admin_data = sequelize.define(
    "admin_data",
    {
      ID: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      admin_role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_data;
};
