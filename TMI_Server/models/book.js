module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "book",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finTechNum: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
