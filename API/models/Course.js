const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  language: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  },
  lessons: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
  }]
});

module.exports = mongoose.model('Course', courseSchema);