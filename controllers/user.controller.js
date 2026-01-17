const express = require('express');
const router = express.Router();
const logger = require('../common/logger.js');
const { configSchema } = require('../validator/joi.validator.js');
const { STATUS_CODES, STATUS_MESSAGES } = require('../common/constants');
const createUser = require('../service/user.service.js');

// Helper to format API response
const apiResponse = (status, message, data = null) => ({
  status,
  message,
  data,
});

// POST /api/user - Create a new user
router.post('/', async (req, res) => {
  try {
    await configSchema.validateAsync(req.body);
    const data = await createUser(req.body);
    const successResponse = apiResponse('SUCCESS', STATUS_MESSAGES.USER_CREATED, data);
    res.status(STATUS_CODES.CREATED).send(successResponse);
  } catch (error) {
    logger.error(`[ERROR] IN CREATE USER CONTROLLER ---> ${JSON.stringify(error)}`);
    const errorResponse = apiResponse('ERROR', error?.message || STATUS_MESSAGES.ERROR);
    res.status(STATUS_CODES.BAD_REQUEST).send(errorResponse);
  }
});

// GET /api/user - Health check / placeholder
router.get('/', async (req, res) => {
  try {
    const successResponse = apiResponse('SUCCESS', 'User endpoint is working');
    res.status(STATUS_CODES.SUCCESS).send(successResponse);
  } catch (error) {
    logger.error(`[ERROR] IN GET USER CONTROLLER ---> ${JSON.stringify(error)}`);
    const errorResponse = apiResponse('ERROR', error?.message || STATUS_MESSAGES.ERROR);
    res.status(STATUS_CODES.ERROR).send(errorResponse);
  }
});

module.exports = router;
