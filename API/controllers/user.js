const User = require('../models/User');

module.exports = {
  profile: (req, res, next) => {
    const { id: userId } = req.params;

    User.findById(userId)
      .populate('courses')
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
    let courseId = req.body.courseId;

    User.findById(req.body.userId)
      .then(async user => {
        if (!user) {
          const error = new Error('User not found');
          error.statusCode = 401;
          throw error;
        };
        let courses = user.courses;
        let distCourses = courses.filter(c => c.toString() !== courseId);
        distCourses.push(courseId);       
        user.courses = distCourses;
        await user.save();
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