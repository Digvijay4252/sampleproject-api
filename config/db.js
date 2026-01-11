const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    dialect: "mysql",
    logging: false
  }
);

const authenticate = async () => {
  await sequelize.authenticate();
};

const sync = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, authenticate, sync };