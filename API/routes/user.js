const router = require('express').Router();
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

router.get('/profile/:id', isAuth, userController.profile);
router.post('/addCourse', isAuth, userController.addCourse);

module.exports = router;