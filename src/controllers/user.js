const User = require('../services/user');
const errorMessages = require('./helpers/errorMessages');

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    const response = await User.login({ email, password });

    const { token, error } = response;

    if (error) return next(errorMessages[error]());

    res.status(200).json({ token });
  },
};