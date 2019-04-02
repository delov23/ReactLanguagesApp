const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    state: {
        type: Number,
        required: true,
        min: 0,
        max: 2,
        // 0 - diapproved, 1 - approved, 2 - waiting
        default: 2
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Application', applicationSchema);