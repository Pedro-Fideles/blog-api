const errorMessages = require('../helpers/errorMessages');
const BlogPost = require('../services/blogPost');

module.exports = {
  create: async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const blogPostCreated = await BlogPost.create({ title, content, categoryIds, userId });

    const { error } = blogPostCreated;
    if (error) return next(errorMessages[error]('categoryIds'));

    res.status(201).json(blogPostCreated);
  },
};