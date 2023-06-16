module.exports = (sequelize, Datatypes) => {
  const users_data = sequelize.define(
    "users_data",
    {
      ID: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_LastName: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      user_FirstName: {
        type: Datatypes.STRING,

        allowNull: false,
      },
      user_MiddleName: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      user_Email: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      user_ContactNum: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      user_Address: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      user_username: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      user_password: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      user_verified: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );

  return users_data;
};
