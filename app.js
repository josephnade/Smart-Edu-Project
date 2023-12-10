const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const authRoute = require('./routes/authRoute');
const dbController = require('./controllers/dbController');
const app = express();

const port = 3000;

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// GLOBAL VARIABLES
global.userSession = null;

// MIDDLEWARES
app.use(express.static('public'));
dbController.connectDB();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());
app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        secret: 'my_keyboard_cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1/smart-edu-db',
        })
    })
);

//ROUTES
app.use('*', (req, res, next) => {
    userSession = req.session.userID;
    next();
});

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/user', authRoute);

app.listen(port, () => {
    console.log(`App listen port ${port}`);
});