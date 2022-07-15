const { Category } = require('../database/models');

module.exports = {
  create: async (data) => {
    const createdUser = await Category.create(data);

    return createdUser;
  },
};