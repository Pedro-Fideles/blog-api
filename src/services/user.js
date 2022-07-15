const { User } = require('../database/models');
const { createToken, decodeToken } = require('./helpers/token');

module.exports = {
  login: async ({ email, password }) => {
    const userFound = await User.findOne({ where: { email } });

    if (!userFound || userFound.password !== password) {
      return { error: 'invalidFields' };
    }

    return { token: createToken(email) };
  },
  create: async (data) => {
    const { email } = data;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) return { error: 'registeredUser' };

    await User.create(data);

    return { token: createToken(email) };
  },
  verifyToken: async (token) => {
    const decoded = decodeToken(token);

    if (decoded.error) return decoded;

    const { data: { email } } = decoded;
    const existingUser = await User.findOne({ where: { email } });
    
    if (!existingUser) return { error: 'invalidToken' };

    return existingUser;
  },
  getAll: () => User.findAll(),
  getById: async (id) => {
    const user = await User.findByPk(id);

    if (!user) return { error: 'notExist' };

    return user;
  },
};
