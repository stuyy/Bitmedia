const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalAuth = require('./strategies/local');
const SessionStore = require('express-session-sequelize')(session.Store);
const database = require('./database/database');
app.use(cookieParser('keyboard cat'));

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    cookie: {
        maxAge: 360000
    },
    store: new SessionStore({ db: database })
}));

app.use(passport.initialize()); 
app.use(passport.session());

const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', authRoute);
app.use('/dashboard', dashboardRoute);

app.listen(process.env.PORT, console.log(`Listening on port 3000.`));