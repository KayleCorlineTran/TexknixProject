const express = require('express');
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/userController');
const authenticateJWT = require('../middleware/auth');
const router = express.Router();

router.use(authenticateJWT); // Áp dụng middleware cho tất cả các route

router.post('/', createCourse);
router.get('/', getCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;