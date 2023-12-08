const mongoose = require('mongoose');
exports.connectDB = () => {
    mongoose
        .connect('mongodb://127.0.0.1/smart-edu-db')
        .then((result) => {
            console.log('Database connected succesfully');
        })
        .catch((err) => {
            console.log('Database has not been connected. Error occured');
            console.log(`Error: ${err}`);
        });
};