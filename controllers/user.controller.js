const express = require('express');
const activity = express.Router();
const logger = require('../common/logger.js');
const activityService = require('../services/activity.service.js');
const Sentry = require('@sentry/node');
const { apiResponse } = require('../services/common.service.js');
const { idSchema } = require('../validators/joi.validator.js');
const { STATUS_CODES, STATUS_MESSAGES } = require('../common/constants');

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