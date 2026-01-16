const dotenv = require('dotenv');

dotenv.config();

const developmentConfig = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.PORT || 3300,
  dialect: 'mysql',
};

const config = {
  development: developmentConfig
};

module.exports = config;
