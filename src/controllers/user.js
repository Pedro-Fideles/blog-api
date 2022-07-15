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
  verifyToken: async (req, _res, next) => {
    const token = req.headers.authorization;

    if (!token || token === '') return next(errorMessages.notFound('Token'));

    const tokenUser = await User.verifyToken(token);
    const { error } = tokenUser;

    if (error) return next(errorMessages[error]());

    req.user = tokenUser;
    return next();
  },
  getAll: async (_req, res) => {
    const users = await User.getAll();
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user.dataValues;
      return userWithoutPassword;
    });
    res.status(200).json(usersWithoutPassword);
  },
  getById: async (req, res, next) => {
    const { id } = req.params;
    const user = await User.getById(id);

    const { error } = user;
    if (error) return next(errorMessages[error]('User'));

    const { password, ...userWithoutPassword } = user.dataValues;
    
    res.status(200).json(userWithoutPassword);
  },
};
