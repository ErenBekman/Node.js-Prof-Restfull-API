const Joi = require('joi')

const createValidation = Joi.object({
    name: Joi.string().required().min(2),
    age: Joi.number().required(),
})

module.exports = {
    createValidation
}