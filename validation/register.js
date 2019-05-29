const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  
  data.username = validText(data.username) ? data.username : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.username, {min: 2, max: 30})) {
    errors.username = 'Username must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field can't be blank";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field can't be blank";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field can't be blank";
  }

  if (!Validator.isLength(data.password, {min: 8, max: 30})) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please retype password";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};