
const joi = require('joi');

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });

const authorSchema = joi.object({
    author_name: joi.string().required()
});

module.exports = validator(authorSchema);