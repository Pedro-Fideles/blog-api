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

    if (!Category.checksIfCategoriesExist(categoryIds)) {
      return { error: 'notFound' };
    }

    const blogPostCreated = BlogPost.create({ title, content, userId });
    
    const { id } = blogPostCreated.dataValues;

    PostCategory.createSeveral(categoryIds, id);

    return blogPostCreated;
  },
};