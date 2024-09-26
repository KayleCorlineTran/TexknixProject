const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    const { title, description } = req.body;
    const teacherId = req.user.id;

    const course = new Course({ title, description, teacher: teacherId });
    await course.save();
    res.status(201).json(course);
};

exports.getCourses = async (req, res) => {
    const courses = await Course.find().populate('teacher', 'email');
    console.log("courses")
    res.json(courses);
};

exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const course = await Course.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(course);
};

exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.status(204).send();
};