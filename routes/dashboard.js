const router = require('express').Router();
const Status = require('../models/StatusUpdate');

router.get('/', async (req, res) => {
    if(req.user) {
        let user = req.user.dataValues;
        let status = await Status.findAll({ where: {
            authorId: user.email
        }, order: [['createdAt', 'DESC']]})
        .catch(err => console.log(err));
        let lastStatus;
        if(status.length !== 0)
            lastStatus = status[0].dataValues;
        else
            lastStatus = null;
        
        res.render('dashboard', { title: 'Dashboard', firstName: user.firstName, lastName: user.lastName, email: user.email, createdAt: user.createdAt, lastStatus: lastStatus });
    }
    else {
        res.status(403);
        res.redirect('/register')
    }
    
});

module.exports = router;    