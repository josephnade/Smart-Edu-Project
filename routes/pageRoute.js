const express = require('express');
const controller = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(controller.getIndexPage);
router.route('/about').get(controller.getAboutPage);

module.exports = router;