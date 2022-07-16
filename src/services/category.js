const { Category } = require('../database/models');

module.exports = {
  create: async (data) => {
    const categoryCreated = await Category.create(data);

    return categoryCreated;
  },
  getAll: () => Category.findAll(),
  checksIfCategoriesExist: async (categoryIds) => {
    const existingCategory = Category.findAll({ where: { id: categoryIds } });

    return categoryIds
      .every((categoryId) => existingCategory
        .some((category) => category.dataValues.id === categoryId));
  },
};