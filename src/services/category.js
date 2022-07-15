const { Category } = require('../database/models');

module.exports = {
  create: async (data) => {
    const categoryCreated = await Category.create(data);

    return categoryCreated;
  },
};