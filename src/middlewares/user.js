const { wrongLength, invalidEmail } = require('../helpers/errorMessages');
const { lengthSmallerThan, emailIsNotValid } = require('./helpers/varifications');

const userValidations = {
  validateName: (req, _res, next) => {
    const { displayName } = req.body;

    switch (true) {
      case lengthSmallerThan(displayName, 8):
        return next(wrongLength('displayName', 8));
      default: 
        return next();
    }
  },
  validateEmail: (req, _res, next) => {
    const { email } = req.body;

    switch (true) {
      case emailIsNotValid(email):
        return next(invalidEmail('email'));
      default: 
        return next();
    }
  },
  validatePassword: (req, _res, next) => {
    const { password } = req.body;

    switch (true) {
      case lengthSmallerThan(password, 6):
        return next(wrongLength('password', 6));
      default: 
        return next();
    }
  },
};

module.exports = userValidations;