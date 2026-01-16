const Joi = require('joi');

const configSchema = Joi.object({
    user_id: Joi.string().required(),
    name: Joi.string().optional().allow(null),
    email: Joi.string().optional().allow(null),
})
