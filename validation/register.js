const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let error = {};

  //Convert empty field to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //name checks
  if (Validator.isEmpty(data.name)) {
    error.name = "Name field is required";
  }

  //email check
  if (Validator.isEmpty(data.email)) {
    error.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }

  //password check
  if (Validator.isEmpty(data.password)) {
    error.password = "Password is required";
  }

  if (Validator.isEmpty(data.password2)) {
    error.password2 = "Password 2 is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    error.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    error.password2 = "Password must be equal";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
