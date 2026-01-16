const express = require('express');
const routes = express.Router();

const userController = require('../controllers/user.controller');

routes.use('/user', userController);

module.exports = routes;