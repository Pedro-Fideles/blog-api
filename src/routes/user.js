const express = require('express');
const User = require('../controllers/user');
const userValidations = require('../middlewares/user');

const router = express.Router();

router.post('/', ...Object.values(userValidations), User.create);

router.use(User.verifyToken);

router.get('/', User.getAll);

router.get('/:id', User.getById);

router.delete('/me', User.delete);

module.exports = router;