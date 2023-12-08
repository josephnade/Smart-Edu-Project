const express = require('express');
const controller = require('../controllers/courseController');


const router = express.Router();

router.route('/').post(controller.createCourse);
router.route('/').get(controller.getAllCourses);
router.route('/:slug').get(controller.getCourse);
module.exports = router;