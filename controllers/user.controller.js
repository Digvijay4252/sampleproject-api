const express = require('express');
const activity = express.Router();
const logger = require('../common/logger.js');
const Sentry = require('@sentry/node');
const { configSchema } = require('../validator/joi.validator.js');
const { STATUS_CODES, STATUS_MESSAGES } = require('../common/constants');
const { userServices } = require('../service/user.service.js');

activity.post('/', async (req, res) => {
    try {
        await configSchema.validateAsync(req.body);
    } catch (error) {
        logger.error(`[ERROR] IN FETCH ACTIVITY LOGS IN CONTROLLER---> ${JSON.stringify(error)}`);
        const errorResponse = createResponse('ERROR', error?.message);
        res.status(STATUS_CODES.BAD_REQUEST).send(errorResponse);
    }
    const data = await userServices.createUser(req.body);
    const successResponse = apiResponse('SUCCESS', STATUS_MESSAGES.USER_CREATED, data);
    res.status(STATUS_CODES.CREATED).send(successResponse);
});

activity.get('/', async(req, res) => {
    try{
        try{
            await idSchema.validateAsync({ id: req.user?.userId });
        } catch (error) {
            logger.error(`[ERROR] IN FETCH ACTIVITY LOGS IN CONTROLLER---> ${JSON.stringify(error)}`);
            Sentry.captureException(error);
            const errorResponse = apiResponse('ERROR', error?.message);
            res.status(STATUS_CODES.BAD_REQUEST).send(errorResponse);
        }
        const data = await activityService.getActivityLogs(req.user?.userId);
        const successResponse = apiResponse('SUCCESS', STATUS_MESSAGES.FETCH_DATA_SUCCESS, data);
        res.status(STATUS_CODES.SUCCESS).send(successResponse);
    } catch (error) {
        logger.error(`[ERROR] IN FETCH ACTIVITY LOGS IN CONTROLLER---> ${JSON.stringify(error)}`);
        Sentry.captureException(error);
        const errorResponse = apiResponse('ERROR', error?.message ?? STATUS_MESSAGES.FETCH_DATA_FAILED);
        res.status(STATUS_CODES.ERROR).send(errorResponse);
    }
});



activity.post('/', async (req, res) => {
  try {
    const {
      contract_id,
      contract_name,
      action,
      message,
    } = req.body;

    if (!contract_id || !contract_name || !action || !message) {
      return res.status(STATUS_CODES.BAD_REQUEST).send(
        apiResponse('ERROR', 'Required fields are missing')
      );
    }

    const payload = {
      contract_id,
      contract_name,
      user_id: req.user?.userId,
      user_email: req.user?.email,
      action,
      message,
      ip_address: req.ip
    };

    const data = await activityService.createActivityLog(payload);

    const successResponse = apiResponse(
      'SUCCESS',
      STATUS_MESSAGES.ACTIVITY_LOGS_CLEARED_SUCCESSFULLY,
      data
    );

    res.status(STATUS_CODES.CREATED).send(successResponse);
  } catch (error) {
    logger.error(`[ERROR] IN CREATE ACTIVITY LOG ---> ${JSON.stringify(error)}`);
    Sentry.captureException(error);

    res.status(STATUS_CODES.ERROR).send(
      apiResponse('ERROR', STATUS_MESSAGES.CLEARING_ACTIVITY_LOGS_FAILED || error.message)
    );
  }
});