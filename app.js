const express = require('express');
const fileUpload = require('express-fileupload');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const dbController = require('./controllers/dbController');
const app = express();

const port = 3000;

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
dbController.connectDB();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(fileUpload());
//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);


app.listen(port, () => {
    console.log(`App listen port ${port}`);
});