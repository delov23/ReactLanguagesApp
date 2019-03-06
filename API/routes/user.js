const router = require('express').Router();
const { body } = require('express-validator/check');
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

router.get('/profile', isAuth, userController.profile);
router.post('/addCourse/:id', isAuth, userController.addCourse);

module.exports = router;