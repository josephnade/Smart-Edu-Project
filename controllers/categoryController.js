const Category = require('../models/Category');

exports.createCategory = async(req, res) => {
    try {
        const category = await Category.create(req.body);
        console.log(`Data has been created successfully: ${category}`);

        res.status(201).json({
            status: 'successed',
            category: category,
        });
    } catch (err) {
        console.error(`Data creating has been failed : ${err}`);
        res.status(400).json({
            status: 'Bad Request. Duplicate key error collection',
            error: err
        });
    }
};