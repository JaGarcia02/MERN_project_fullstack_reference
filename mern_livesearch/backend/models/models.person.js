module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define("persons", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    personFullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Person;
};
