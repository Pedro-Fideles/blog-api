const { isRequired } = require('../helpers/errorMessages');
const { isUndefined, blankField } = require('./helpers/varifications');

module.exports = {
  validateName: (req, _res, next) => {
    const { name } = req.body;

    switch (true) {
      case isUndefined(name) || blankField(name):
        return next(isRequired('name'));
      default:
        return next();
    }
  },
};
