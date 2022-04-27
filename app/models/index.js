const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.nft = require("./nft.model.js")(sequelize, Sequelize);
db.pumpkin = require("./pumpkin.model.js")(sequelize, Sequelize);
db.contracts = require("./contracts.model.js")(sequelize, Sequelize);
db.opensea = require("./opensea.model.js")(sequelize, Sequelize);
db.testnfts = require("./testnfts.model.js")(sequelize, Sequelize);
db.guilds = require("./guilds.model.js")(sequelize, Sequelize);
db.members = require("./members.model.js")(sequelize, Sequelize);
db.membersApply = require("./members.apply.model.js")(sequelize, Sequelize);

module.exports = db;