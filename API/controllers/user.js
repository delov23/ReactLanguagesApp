const User = require('../models/User');

module.exports = {
  profile: (req, res, next) => {
    const { userId } = req;

    User.findById(userId)
      .populate('lessons')
      .then((user) => {
        if (!user) {
          const error = new Error('User not found');
          error.statusCode = 401;
          throw error;
        }
        res.status(200).json({
          message: 'User found',
          user
        });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  },
  addCourse: (req, res, next) => {
    let courseId = req.params.id;

    User.findById(req.userId)
      .then(async user => {
        if (!user) {
          const error = new Error('User not found');
          error.statusCode = 401;
          throw error;
        };
        user.courses.push(courseId);
        await user.save()
        res.status(200).json({
          message: 'Course added to user\'s profile',
          user
        });
      }).catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  },
}