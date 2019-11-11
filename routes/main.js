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

router.get('/recover', isRegistered, (req, res) => {
    res.render('routes/recover', { title: 'Recover Your Account', msg: req.flash('success') });
});

router.post('/recover', isRegistered, (req, res) => {
    let { email } = req.body;
    console.log(email)
    req.flash('success', 'Please check your E-Mail for instructions on how to recover your account!');
    res.redirect('/recover');
});

module.exports = router;