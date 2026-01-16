const STATUS_MESSAGES ={
    AUTHENTICATION_SUCCESS: 'Authentication success',
    AUTHENTICATION_FAILED: 'Authentication failed',
}
const STATUS_CODES = Object.freeze({
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    CREATED: 200,
    ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND:404,
    NOT_ACCEPTABLE: 406
});


module.exports = {STATUS_MESSAGES, STATUS_CODES}