const { STATUS_CODES, STATUS_MESSAGES } = require('../common/constants.js');
const jwt = require('jsonwebtoken');
const logger = require('../common/logger.js');
const { verifyAccessToken, getAccessToken } = require('../services/google.service.js');
const { getUser, createOrUpdateUser } = require('../services/user.service.js');

const authUser = async (req, res, next) => {
    try {
        const bearerToken = req.headers['token'];
        if (bearerToken) {
        const token = bearerToken.split(' ').pop();
        const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(response){
            req['user'] = response;
        }
      }
       next();
    } catch (error) {
        logger.error('[ERROR] IN INSIDE TOKEN MIDDLEWARE --->', error);
        return res.status(401).send({ statusCode: STATUS_CODES.UNAUTHORIZED, message: error?.message || STATUS_MESSAGES.AUTHENTICATION_FAILED});
    }
}