const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subject_name: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    topics: {
        type: [String],
        default: [], // Default to an empty array
    },
});

const Subjects = mongoose.model('Subjects', subjectSchema);
module.exports = Subjects;
