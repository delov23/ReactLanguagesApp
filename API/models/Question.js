const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    a1: {
        type: String,
        required: true
    },
    a2: {
        type: String,
        required: true
    },
    a3: {
        type: String,
        required: true
    },
    answer: {
        type: Number,
        min: 1,
        max: 3
    }
});

module.exports = mongoose.model('Question', questionSchema);