const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');

router.post('/signup', [
    body('username')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid username.')
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('Username already exists!');
          }
        })
      }),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.')
  ], authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;
