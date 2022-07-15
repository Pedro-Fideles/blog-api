const Category = require('../services/category');

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    const categoryCreated = await Category.create({ name });

    res.status(201).json(categoryCreated);
  },
  getAll: async (req, res) => {
    const categories = await Category.getAll();

    res.status(200).json(categories);
  },
};
