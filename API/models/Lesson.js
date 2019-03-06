const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  video: {
    type: String,
    // required: true
  },
  words: [{
    type: Schema.Types.ObjectId,
    ref: 'Word',
    required: true
  }],
  grammar: [{
    type: String,
    required: true
  }],
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  test: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true   
  }]
});

module.exports = mongoose.model('Lesson', lessonSchema);