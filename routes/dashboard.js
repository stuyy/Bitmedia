const router = require('express').Router();

router.get('/', (req, res) => {
    if(req.user) {
        let user = req.user.dataValues;
        res.render('dashboard', { title: 'Dashboard', firstName: user.firstName, lastName: user.lastName, email: user.email, createdAt: user.createdAt });
    }
    else {
        res.status(403);
        res.redirect('/register')
    }
    
})

module.exports = router;