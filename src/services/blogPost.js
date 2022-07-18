const { or, like } = require('sequelize').Op;
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
    const posts = await BlogPost.findAll({
      where: { userId },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return posts;
  },
  getById: async (postId) => {
    const post = await BlogPost.findByPk(postId, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!post) return { error: 'notExist' };

    return post;
  },
  update: async (data, postId, userId) => {
    const { dataValues: { userId: userPost } } = await BlogPost.findByPk(postId);
    if (userPost !== userId) return { error: 'unauthorizedUser' };

    await BlogPost.update(data, { where: { userId } });

    return { message: 'success' };
  },
  delete: async (postId, userId) => {
    const existingPost = await BlogPost.findByPk(postId);
    if (!existingPost) return { error: 'notExist' };
    if (existingPost.dataValues.userId !== userId) return { error: 'unauthorizedUser' };

    await BlogPost.destroy({ where: { id: postId } });

    return { message: 'success' };
  },
  search: async (term) => {
    const searchResult = BlogPost.findAll({
      where: {
        [or]: [
          { title: { [like]: `%${term}%` } },
          { content: { [like]: `%${term}%` } },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return searchResult;
  },
};
