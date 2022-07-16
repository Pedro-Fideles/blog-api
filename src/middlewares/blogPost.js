const { requiredFields } = require('../helpers/errorMessages');
const { isUndefined, blankField, emptyArray } = require('./helpers/varifications');

module.exports = {
  validateTitle: (req, _res, next) => {
    const { title } = req.body;

    switch (true) {
      case isUndefined(title) || blankField(title):
        return next(requiredFields());
      default:
        return next();
    }
  },
  validateContent: (req, _res, next) => {
    const { content } = req.body;

    switch (true) {
      case isUndefined(content) || blankField(content):
        return next(requiredFields());
      default:
        return next();
    }
  },
  validateCategories: (req, _res, next) => {
    const { categoryIds } = req.body;

    if (req.method === 'POST') {
      switch (true) {
        case isUndefined(categoryIds) || emptyArray(categoryIds):
          return next(requiredFields());
        default:
          return next();
      }
    }

    next();
  },
};
