const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalAuth = require('./strategies/local');

app.use(cookieParser('keyboard cat'));

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    cookie: {
        maxAge: 360000
    }
}));

app.use(passport.initialize()); 
app.use(passport.session());

const authRoute = require('./routes/auth');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', authRoute);

app.listen(3000, console.log(`Listening on port 3000.`));