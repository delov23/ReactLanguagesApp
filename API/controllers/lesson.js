const { validationResult } = require('express-validator/check');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const Word = require('../models/Word');
const Question = require('../models/Question');

function validatePost(req, res) {
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

async function isAdmin (req) {
  let user = await User.findById(req.userId);
  return user.role === 'Admin';
}

module.exports = {
  getLessonsByCourse: (req, res, next) => {
    let courseId = req.params.id;
    Lesson.find({ course: courseId })
      .then((lessons) => {
        res
          .status(200)
          .json({ message: 'Fetched lessons successfully.', lessons });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  getLessonById: (req, res, next) => {
    let lessonId = req.params.id;
    Lesson.findById(lessonId)
      .populate('test')
      .populate('words')
      .populate('course')
      .then((lesson) => {
        res
          .status(200)
          .json({ message: 'Fetched lesson successfully.', lesson });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  createLesson: async (req, res, next) => {
    // Validate post using express-validator
    // Return 422 with errors array if something went wrong
    let approved = await isAdmin(req);   
    if (validatePost(req, res) && approved) {
        const { course, title, image, video, words: wordsJSON, grammar, test: testJSON } = req.body;
        let words = JSON.parse(wordsJSON);
        let test = JSON.parse(testJSON);
        let questionIds = [];
        let wordsIds = [];
        
        for (const w of words) {
          let { word, translation } = w;
          let newWord = await Word.create({ word, translation })
          wordsIds.push(newWord._id);
        }
  
        for (const q of test) {
          let { question, a1, a2, a3, answer } = q;
          let newQ = await Question.create({ question, a1, a2, a3, answer });
          questionIds.push(newQ._id);
        }
  
        // Create the post in DB and return 201 status code with a message and the post itself with the creator
        const lesson = new Lesson({ course, title, image, video, words: wordsIds, grammar, test: questionIds });
  
        lesson.save()
          .then(() => {
            res
              .status(201)
              .json({
                message: 'Lesson created successfully!',
                lesson,
              })
          })
          .catch((error) => {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            console.error(error);
    
            next(error);
          });
      } else {
        res
              .status(403)
              .json({
                message: 'Not approved'
              })
        next(new Error('Not approved'));
      }
  },
  deleteLesson: async (req, res, next) => {
    const lessonId = req.params.id;
    const approved = await isAdmin(req);
    
    if (approved) {
      Lesson.findById(lessonId)
      .then(async (lesson) => {
        if (!lesson) {
          const error = new Error('Lesson not found!');
          error.statusCode = 404;
          throw error;
        }
        for (const word of lesson.words) {
          await Word.findByIdAndRemove(word._id);
        }
        for (const q of lesson.test) {
          await Question.findByIdAndRemove(q._id);
        }
        return Lesson.findByIdAndDelete(lessonId);
      })
      .then(() => {
        res.status(200)
        .json({
          message: 'Lesson deleted successfully!'
        })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
    }
    
  },
}