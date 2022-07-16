const { PostCategory } = require('../database/models');

module.exports = {
  createSeveral: async (categoryIds, postId) => {
    const postsCategorys = categoryIds.map((categoryId) => ({ postId, categoryId }));
    await PostCategory.bulkCreate(postsCategorys);
  },
};