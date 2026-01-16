const Joi = require('joi');

const configSchema = Joi.object({
    id: Joi.string().required()
})
