module.exports = (sequelize, DataTypes) => {
  const upload_file = sequelize.define(
    "upload_file",
    {
      ID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return upload_file;
};
