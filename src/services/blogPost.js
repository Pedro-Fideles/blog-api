const { BlogPost, User, Category } = require('../database/models');
const CategoryService = require('./category');
const PostCategory = require('./postCategory');

/* {
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
} */

module.exports = {
  create: async (data) => {
    const { title, content, userId, categoryIds } = data;

    const categoryExists = await CategoryService.checksIfCategoriesExist(categoryIds);

    if (!categoryExists) {
      return { error: 'notFoundField' };
    }

    const blogPostCreated = await BlogPost.create({ title, content, userId });

    const { id } = blogPostCreated.dataValues;

    await PostCategory.createSeveral(categoryIds, id);

    return blogPostCreated;
  },
  getAll: async (userId) => {
    const posts = PostCategory.findAll({
      where: userId,
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return posts;
  },
};