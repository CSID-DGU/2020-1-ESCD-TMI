const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.js"))[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Manager = require("./manager")(sequelize, Sequelize);
db.Book = require("./book")(sequelize, Sequelize);
db.List = require("./list")(sequelize, Sequelize);

db.Manager.hasMany(db.Book, { foreignKey: "writer", sourceKey: "id" });
db.Book.belongsTo(db.Manager, { foreignKey: "writer", sourceKey: "id" });

db.Book.hasMany(db.List, { foreignKey: "ofWhom", sourceKey: "id" });
db.List.belongsTo(db.Book, { foreignKey: "ofWhom", sourceKey: "id" });

module.exports = db;
