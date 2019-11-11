const router = require('express').Router();

const isAuthorized = (req, res, next) => req.user ? res.redirect('/dashboard') : next();
const isRegistered = (req, res, next) => req.user ? res.redirect('/dashboard') : next();

router.get('/guest', (req, res) => {
    res.send(200);
});

router.get('/register', isRegistered, (req, res) => {
    res.render('routes/register', { error: { error: [] },
    title: 'Register', firstName: '', lastName: '', email: '' });
});

router.get('/login', isAuthorized, (req, res) => {
    res.render('routes/login', { title: 'Login', msg: req.flash('success') })
});

router.get('/logout', (req, res)  =>  {
    if(req.user) {
        req.logout();
        res.redirect('/login');
    }
    else
        res.status(403).redirect('/login')
});

module.exports = router;