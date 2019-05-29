const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateGroupInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';

    if(!Validator.isLength(data.name, { min: 4, max: 30 })) {
        errors.name = 'Name of group cannot exceed 30 characters.'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};