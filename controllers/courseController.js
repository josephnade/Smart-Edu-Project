const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async(req, res) => {
    try {
        const course = await Course.create(req.body);
        console.log(`Data has been created successfully: ${course}`);

        res.status(201).json({
            status: 'successed',
            course: course,
        });
    } catch (err) {
        console.error(`Data creating has been failed : ${err}`);
        res.status(400).json({
            status: 'Bad Request. Duplicate key error collection',
            error: err
        });
    }
};

exports.getAllCourses = async(req, res) => {
    try {

        let filter = {};
        if (req.query.categories) {
            const categoriesSlug = req.query.categories;
            const category = await Category.findOne({ slug: categoriesSlug });
            filter = { category: category._id };
        }


        const courses = await Course.find(filter);
        const categories = await Category.find();
        console.log(`Data has been listed successfully`);

        res.status(200).render('courses', {
            courses: courses,
            categories: categories,
            page_name: "courses"
        });
    } catch (err) {
        console.error(`Data listing has been failed : ${err}`);
        res.status(400).json({
            status: 'failed',
            error: err
        });
    }
};
exports.getCourse = async(req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        const categories = await Category.find();
        console.log(`Data has been listed successfully`);

        res.status(200).render('course', {
            course: course,
            categories: categories,
            page_name: "course"
        });
    } catch (err) {
        console.error(`Data listing has been failed : ${err}`);
        res.status(400).json({
            status: 'failed',
            error: err
        });
    }
};