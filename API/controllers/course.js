const { validationResult } = require('express-validator/check');
const Course = require('../models/Course');
const User = require('../models/User');

function validateCourse(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });

    return false;
  }

  return true;
}

module.exports = {
  getCourses: (req, res, next) => {
    Course.find({})
      .then((courses) => {
        res
          .status(200)
          .json({ message: 'Fetched courses successfully.', courses });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createCourse: async (req, res, next) => {
    let approved;
    try {
      approved = await User.findById(req.userId);
    } catch (err) {
      next(err);
    }
    approved = approved.role === 'Admin';
    if (validateCourse(req, res) && approved) {
      const { language, flag } = req.body;

      const course = new Course({ language, flag });

      course.save()
        .then(() => {
          res
            .status(201)
            .json({
              message: 'Course added!',
              course,
            });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
  
          next(error);
        });
    } else {
      next(new Error('Only admins may add courses'));
    }
  }
}