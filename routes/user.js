const router = require('express').Router();
const User = require('../models/User');
const Status = require('../models/StatusUpdate');
const DB = require('../database/database');
Status.init(DB);
Status.sync();

function isUserAuthenticated(req, res, next) {
    if(req.user) next();
    else {
        res.status(403).redirect('/login')
    }
}
router.get('/', (req, res) => {
    if(req.user) {
        res.send("user")
    }
    else {
        res.status(403);
        res.redirect('/register')
    }
});

router.get('/post/', isUserAuthenticated, (req, res) => {
    res.send("Yeet")
});

router.post('/post/status', isUserAuthenticated, async (req, res) => {
    
    let user = req.user.dataValues;
    try {
        await Status.create({
            author: user.firstName + " " + user.lastName,
            authorId: user.email,
            statusContent: req.body.status
        });
        res.status(200).send(200);
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
});

module.exports = router;