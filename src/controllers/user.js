const User = require('../services/user');
const errorMessages = require('../helpers/errorMessages');

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    const response = await User.login({ email, password });

    const { token, error } = response;

    if (error) return next(errorMessages[error]());

    res.status(200).json({ token });
  },
  create: async (req, res, next) => {
    const { displayName, email, password, image } = req.body;

    const response = await User.create({ displayName, email, password, image });

    const { token, error } = response;

    if (error) return next(errorMessages[error]('User'));

    res.status(201).json({ token });
  },
};