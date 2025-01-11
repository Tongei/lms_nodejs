
const joi = require('joi');

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });

const bookSchema = joi.object({
    book_name: joi.string().required()
});

module.exports = validator(bookSchema);