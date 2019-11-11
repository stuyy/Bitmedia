require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalAuth = require('./strategies/local');
const GoogleStrategy = require('./strategies/google');
const FacebookStrategy = require('./strategies/facebook');
const GitHubStrategy = require('./strategies/github');
const SessionStore = require('express-session-sequelize')(session.Store);
const database = require('./database/database');
const PORT = process.env.PORT || 3506;
const morgan = require('morgan');
const ENVIRONMENT = process.env.ENVIRONMENT;
const path = require('path');
if(ENVIRONMENT === 'DEV')
  app.use(morgan('tiny'));

app.use(cookieParser('keyboard cat'));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'some string',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    },
    store: new SessionStore({ db: database })
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const userRoute = require('./routes/user');
const taskRoute = require('./routes/task');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/user', userRoute);
app.use('/task', taskRoute);

app.use((req, res) => res.redirect('/dashboard'));

const server = app.listen(PORT);
server.on('listening', () => console.log(`Listening on port ${PORT}.`));
