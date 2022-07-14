const express = require('express');
const User = require('../controllers/user');
const userValidations = require('../middlewares/user');

const router = express.Router();

router.post('/', ...Object.values(userValidations), User.create);

module.exports = router;