const express = require('express');
const controller = require('../controllers/authController');


const router = express.Router();

router.route('/sign-up').post(controller.registerUser);
router.route('/login').post(controller.loginUser);
router.route('/logout').get(controller.logoutUser);

module.exports = router;