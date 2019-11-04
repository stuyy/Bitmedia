const router = require('express').Router();
const { check, validationResult } = require('express-validator');

router.get('/register', (req, res) => {
    res.render('register', { error: {
        error: []
    }, title: 'Register' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login'})
});

router.post('/register', [
    check('email').isEmail().withMessage('Invalid Email Address'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters.'),
    check('password').custom((val, { req }) => {
        if(val !== req.body.confirm) throw new Error("Passwords don't match.");
        else return true;
    }).withMessage("Passwords don't match.")
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errs = errors.array().map(err => err.msg);
        req.flash('error', errs);
        res.render('register', { error: req.flash(), title: 'Register'});
        res.end();
    }
    console.log(req.body);
});
module.exports = router;