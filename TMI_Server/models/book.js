module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "book",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bankNum: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
