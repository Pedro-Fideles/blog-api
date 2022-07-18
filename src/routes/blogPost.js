const express = require('express');
const BlogPost = require('../controllers/blogPost');
const User = require('../controllers/user');
const validateBlogPost = require('../middlewares/blogPost');

const router = express.Router();

router.use(User.verifyToken);

router.post('/', ...Object.values(validateBlogPost), BlogPost.create);

router.get('/', BlogPost.getAll);

router.get('/:id', BlogPost.getById);

router.put('/:id', ...Object.values(validateBlogPost), BlogPost.update);

router.delete('/:id', BlogPost.delete);

module.exports = router;