const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let error = {};

  //Convert empty to an empty string functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //email check
  if (Validator.isEmpty(data.email)) {
    error.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }

  //password check
  if (Validator.isEmpty(data.password)) {
    error.password = "password field required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
