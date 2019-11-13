const router = require('express').Router();
const crypto = require('crypto');
const EventEmitter = require('events').EventEmitter;
// Need initialization vector for randomness.
// Need a key

const codes = new Map();

function verifyCode(req, res, next) {
    console.log(req.resetToken);
    let { code } = req.query;
    if(codes.has(code)) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

router.get('/password/reset/', verifyCode, (req, res) => {
    const { code } = req.query;
    if(code) {
        // Decrypt code.
    }
    res.render('routes/resetpw', {
        title: 'Reset Your Password'
    });
});

module.exports = router;