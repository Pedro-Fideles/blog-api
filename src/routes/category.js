const express = require('express');
const Category = require('../controllers/category');

const router = express.Router();

router.post('/', Category.create);

module.exports = router;