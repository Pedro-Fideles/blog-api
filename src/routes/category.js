const express = require('express');
const Category = require('../controllers/category');
const User = require('../controllers/user');
const categoryValidations = require('../middlewares/category');

const router = express.Router();

router.use(User.verifyToken);

router.post('/', categoryValidations.validateName, Category.create);

module.exports = router;