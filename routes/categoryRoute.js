const express = require('express');
const controller = require('../controllers/categoryController');


const router = express.Router();

router.route('/').post(controller.createCategory);

module.exports = router;