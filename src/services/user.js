const { User } = require('../database/models');
const { createToken } = require('./helpers/token');

const user = {
  login: async ({ email, password }) => {
    const userFound = await User.findOne({ where: { email } });

    if (!userFound || userFound.password !== password) {
      return { error: 'invalidFields' };
    }

    return { token: createToken(email) };
  },
};

module.exports = user;
