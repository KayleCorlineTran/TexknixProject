const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: String,
    description: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const CourseModel = mongoose.model('courses', CourseSchema);

module.exports = CourseModel;