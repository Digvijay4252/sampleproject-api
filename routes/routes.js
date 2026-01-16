const express = require('express');
const routes = express.Router();

const fileController = require('../controllers/file.controller');

const { authUser } = require('../middlewares/verify-token.middleware');


routes.use('/file', authUser, fileController);

module.exports = routes;