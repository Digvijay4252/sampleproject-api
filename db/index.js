const { Sequelize, DataTypes}  = require("sequelize");
const logger = require('../common/logger.js');
const db = {};

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.DB_PORT || process.env.PORT || 3300,
    dialect: "mysql"
});

sequelize.authenticate().then(() => logger.info(`DATABASE CONNECTED SUCCESSFULLY`))
    .catch(error => logger.error(`[ERROR] WHILE CONNECTING DATABASE ---> ${JSON.stringify(error)}`));

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./models/user')(sequelize, DataTypes);

(async () => {
    await sequelize.sync({alter: true});
})();

module.exports = db;