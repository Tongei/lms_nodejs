
const joi = require('joi');

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });

const categorySchema = joi.object({
    category_name: joi.string().required()
});

module.exports = validator(categorySchema);