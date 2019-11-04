const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

app.use(cookieParser('keyboard cat'));
app.use(session({
    cookie: { maxAge: 60000 }
}));

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoute = require('./routes/auth');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', authRoute);

app.listen(3000, console.log(`Listening on port 3000.`));