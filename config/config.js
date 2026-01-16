const dotenv = require('dotenv');

dotenv.config();

const developmentConfig = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: 'mysql',
};

const config = {
  development: developmentConfig
};

module.exports = config[process.env.NODE_ENV || 'development'];
