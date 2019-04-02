const router = require('express').Router();
const application = require('../controllers/application');
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator/check');

router.get('/all', isAuth, application.getApplications);
router.get('/user/:id', isAuth, application.getApplicationsByUserId);
router.put('/approve/:approval/:id', isAuth, application.approve)
router.post('/apply', isAuth, [
    body('title')
    .trim()
    .isLength({ max: 30 }),
    body('body')
    .trim()
    .isLength({ min: 30 })
], application.apply);

module.exports = router;