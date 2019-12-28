const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field can't be blank";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field can't be blank";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};