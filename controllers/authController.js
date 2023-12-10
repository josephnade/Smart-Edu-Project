const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.registerUser = async(req, res) => {
    try {
        const user = await User.create(req.body);
        console.log(`User has been created successfully: ${user}`);

        res.status(201).json({
            status: 'successed',
            user: user,
        });
    } catch (err) {
        console.error(`User creating has been failed : ${err}`);
        res.status(400).json({
            status: 'failed',
            error: err,
        });
    }
};
exports.loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        bcrypt.compare(password, user.password, (err, same) => {
            if (same) {
                //TODO USER SESSION
                req.session.userID = user._id;
                console.log(`User has been login successfully: ${user}`);
                res.status(200).redirect('/');
            } else {
                console.error(`Login has been failed : Wrong password`);
                res.status(400).send('WRONG PASSWORD');
            }
        });
    } catch (err) {
        console.error(`Login has been failed : ${err}`);
        res.status(400).json({
            status: 'failed',
            error: `${err}`,
        });
    }
};
exports.logoutUser = async(req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/');
        })
    } catch (err) {
        console.error(`Logout has been failed : ${err}`);
        res.status(400).json({
            status: 'failed',
            error: `${err}`,
        });
    }
};