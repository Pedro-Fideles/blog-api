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
  getAll: async (req, res) => {
    const { dataValues: { id } } = req.user;

    const posts = await BlogPost.getAll(id);

    res.status(200).json(posts);
  },
  getById: async (req, res, next) => {
    const { id } = req.params;

    const post = await BlogPost.getById(id);

    const { error } = post;
    if (error) return next(errorMessages[error]('Post'));

    res.status(200).json(post);
  },
};