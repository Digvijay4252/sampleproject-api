const { Sequelize, DataTypes}  = require("sequelize");
const logger = require('../common/logger.js');
const db = {};

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.DB_PORT || process.env.PORT || 3306,
    dialect: "mysql"
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./models/user')(sequelize, DataTypes);

// Initialize database: authenticate and sync
const initializeDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info(`DATABASE CONNECTED SUCCESSFULLY`);
        await sequelize.sync();
    } catch (error) {
        logger.error(`[ERROR] WHILE CONNECTING/SYNCING DATABASE ---> ${JSON.stringify(error)}`);
        throw error;
    }
};

db.initializeDB = initializeDB;

module.exports = db;