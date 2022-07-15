const { Category } = require('../services/category');

module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    const categoryCreated = Category.create({ name });

    res.status(201).json(categoryCreated);
  },
};
