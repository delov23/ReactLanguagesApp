const router = require('express').Router();
const { body } = require('express-validator/check');
const courseController = require('../controllers/course');
const isAuth = require('../middleware/is-auth');

router.get('/all', isAuth, courseController.getCourses);
router.post('/create', isAuth , [
  body('language')
    .trim(),
  body('flag')
    .trim()
    .isURL()
], courseController.createCourse);


module.exports = router;