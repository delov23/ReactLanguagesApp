const router = require('express').Router();
const {
    body
} = require('express-validator/check');
const lessonController = require('../controllers/lesson');
const isAuth = require('../middleware/is-auth');

router.get('/findByCourse/:id', isAuth, lessonController.getLessonsByCourse);
router.get('/:id', isAuth, lessonController.getLessonById);
router.post('/create', isAuth, [
    body('title')
    .trim(),
    body('image')
    .trim()
    .isURL(),
    body('words')
    .trim(),
    body('grammar')
    .isArray(),
    body('test')
    .trim()
], lessonController.createLesson)
router.delete('/remove/:id', isAuth, lessonController.deleteLesson);

module.exports = router;