const router = require('express').Router();
const MailTransporter = require('../utils/MailTransporter');
const Encrypter = require('../utils/Encrypter');
const ServerHandler = require('../utils/ServerEvents');
const User = require('../models/User');

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
    res.render('routes/recover', { title: 'Recover Your Account', msg: req.flash('recover'), error: req.flash('error') });
});

router.post('/recover', isRegistered, async (req, res) => {
    let { email } = req.body;
    
    let user = await User.findByPk(email).catch(err => console.log(err));
    if(!user) {
        req.flash('error', 'Email does not exist.');
        res.redirect('/recover');
    }
    else {
        req.flash('recover', 'Please check your E-Mail for instructions on how to recover your account!');
        res.redirect('/recover');
        // Send Email to Email Address.

        let transporter = new MailTransporter();
        let encryptedEmail = await Encrypter.encrypt(email);
        let mail = await transporter.sendMail({
            receiver: email,
            subject: 'Reset Your Password',
            message: `Hello! Please follow the instructions on this link to reset your password: http://localhost:3000/account/password/reset?code=${encryptedEmail}`
        }).catch(err => console.log(err));
        if(mail)
            ServerHandler.emailSendEvent(encryptedEmail);
        else
            console.log("Something went wrong......");
    }
    
});

module.exports = router;