const { BlogPost } = require('../database/models');
const Category = require('./category');
const PostCategory = require('./postCategory');

/* {
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
} */

module.exports = {
  create: async (data) => {
    const { title, content, userId, categoryIds } = data;

    const categoryExists = await Category.checksIfCategoriesExist(categoryIds);

    console.log('\n\n\n services categoria existente');
    console.log(categoryExists);

    if (!categoryExists) {
      return { error: 'notFoundField' };
    }

    const blogPostCreated = await BlogPost.create({ title, content, userId });

    const { id } = blogPostCreated.dataValues;

    await PostCategory.createSeveral(categoryIds, id);

    return blogPostCreated;
  },
};