const STATUS_MESSAGES ={
    SUCCESS: 'Request processed successfully',
    ERROR: 'An error occurred while processing the request',
    CREATED: 'Resource created successfully',
    AUTHENTICATION_SUCCESS: 'Authentication success',
    AUTHENTICATION_FAILED: 'Authentication failed',
    BAD_REQUEST: 'Bad request',
    NOT_FOUND: 'Resource not found',
    USER_CREATED: 'User created successfully',
    ENTER_VALID_PASSWORD: 'Please enter a valid password',
    ENTER_VALID_USERNAME: 'Please enter a valid username',
    ENTER_VALID_EMAIL: 'Please enter a valid email',
    USER_NOT_FOUND: 'User not found',
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