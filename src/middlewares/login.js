const { requiredFields } = require('../helpers/errorMessages');
const { isUndefined } = require('./helpers/varifications');

module.exports = {
  validatePayload: (req, _res, next) => {
    const { email, password } = req.body;

    switch (true) {
      case isUndefined(email) || isUndefined(password):
        return next(requiredFields());
      default:
        return next();
    }
  },
};
