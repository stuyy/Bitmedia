const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');
const User = require('../models/User');
const DB = require('../database/database');
User.init(DB);
User.sync();
router.get('/register', (req, res) => {
    res.render('register', { error: {
        error: []
    }, title: 'Register', firstName: '', lastName: '', email: '' });
});

router.get('/login', (req, res) => {
    let msg = req.flash('success');
    res.render('login', { title: 'Login', msg })
});

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
        console.log(errors);
        let errs = errors.array().map(err => err.msg);
        req.flash('error', errs);
        res.render('register', { error: req.flash(), title: 'Register', firstName: firstName, lastName: lastName, email: email });
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