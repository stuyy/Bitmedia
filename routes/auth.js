const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');
const User = require('../models/User');
const passport = require('passport');

const redirectDashboard = (req, res) => res.redirect('/dashboard');
const isAuthorized = (req, res, next) => req.user ? res.redirect('/dashboard') : next();
const isRegistered = (req, res, next) => req.user ? res.redirect('/dashboard') : next();

router.post('/login', passport.authenticate('local'), redirectDashboard);
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email']}));
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }), redirectDashboard);
router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/facebook/redirect', passport.authenticate('facebook'), redirectDashboard);
router.get('/login/github', passport.authenticate('github'));
router.get('/github/redirect', passport.authenticate('github', { failureRedirect: '/login' }), redirectDashboard);

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



module.exports = router;
