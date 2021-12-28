var Sequelize = require("sequelize");
var dbConfig = require("../db.Config");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.productTable = require("./product.model")(sequelize, Sequelize);
db.cartTable = require("./cart.model")(sequelize, Sequelize);
db.userTable = require("./user.model")(sequelize, Sequelize);
db.otpTable = require("./otp.model")(sequelize, Sequelize);
db.orderTable = require("./order.model")(sequelize, Sequelize);
module.exports = db;
