module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "list",
    {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inOrOut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bankContent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserContent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      money: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      where: {
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
