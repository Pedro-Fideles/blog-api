const { User } = require('../database/models');
const { createToken } = require('./helpers/token');

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
};
