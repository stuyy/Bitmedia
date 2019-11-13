const router = require('express').Router();
const Encrypter = require('../utils/Encrypter');
const ServerHandler = require('../utils/ServerEvents');
// Need initialization vector for randomness.
// Need a key

const codes = new Map();

/**
 * Middleware function used to verify if the query parameter 'code' is
 * valid. Every code will decrypt to an e-mail address that is in the
 * Database. We need to decrypt every code first
 */
async function verifyCode(req, res, next) {
    let { code } = req.query;
    let decryptedEmail = await Encrypter.decrypt(code)
        .catch(err => console.log(err));
    console.log(decryptedEmail)
    if(codes.has(code)) {
        console.log("Code is valid, and is in the map..");
        console.log(codes);
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

ServerHandler.on('onEmailSend', email => {
    codes.set(email, true);
    console.log("Hello?????");
    console.log(codes);
    setTimeout(() => {
        codes.delete(email);
        console.log("Removed code.");
    }, 5 * 60 * 1000); // 10 Minutes.
});

module.exports = router;