const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');
const User = require('../models/User');
const passport = require('passport');

router.get('/register', isRegistered, (req, res) => {
    res.render('routes/register', { error: {
        error: []
    }, title: 'Register', firstName: '', lastName: '', email: '' });
});

router.get('/login', isAuthorized, (req, res) => {
    let msg = req.flash('success');
    console.log(req.session);
    res.render('routes/login', { title: 'Login', msg })
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log(req.session)
    console.log("Redirecting...")
    res.redirect('/dashboard')
});

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email']}), (req, res) => {
    console.log("Good!");
});

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dashboard');
});

router.get('/login/facebook', passport.authenticate('facebook'), (req, res) => {
  console.log("Authenticating with Facebook.")
});

router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/dashboard');
})

router.post('/register', [
    check('firstName').isLength({ min: 1 }).withMessage('Name too short!'),
    check('lastName').isLength({ min: 1 }).withMessage('Name too short!'),
    check('email').isEmail().withMessage('Invalid Email Address'),
    check('email').custom(async value => {
        let user = await User.findOne({ where: { email: value }})
            .catch(err => console.log(err));
        if(user) throw new Error("Email already in use.");
        else return false;
    }).withMessage("Email already in use."),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters.'),
    check('password').custom((val, { req }) => {
        if(val !== req.body.confirm) throw new Error("Passwords don't match.");
        else return true;
    }).withMessage("Passwords don't match.")
  ], async (req, res) => {
    const errors = validationResult(req);
    let { firstName, lastName, email, password } = req.body;
    if (!errors.isEmpty()) {
        let errs = errors.array().map(err => err.msg);
        req.flash('error', errs);
        res.render('routes/register', { error: req.flash(), title: 'Register', firstName: firstName, lastName: lastName, email: email });
        res.end();
    }
    else {
        password = await User.hashPassword(password);
        let user = await User.create({ firstName: firstName, lastName: lastName, email: email, password: password }).catch(err => console.log(err));
        if(user)
        {
            req.flash('success', 'You can now login.');
            res.redirect('/login');
        }
    }
});

router.get('/logout', (req, res)  =>  {
    if(req.user) {
        req.logout();
        req.session.destroy(err => console.log(err));
        console.log("Logging out.")
        res.redirect('/login');
    }
    else {
        res.status(403);
        res.redirect('/login');
    }
})
function isRegistered(req, res, next) {
    console.log(req.session)
    if(req.user) {
        console.log('Yes');
        res.redirect('/dashboard');
    }
    else next();
}

function isAuthorized(req, res, next) {

    if(req.user) res.redirect('/dashboard');
    else next();
}
module.exports = router;
