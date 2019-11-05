const router = require('express').Router();

router.get('/', (req, res) => {
    let user = req.user.dataValues;
    res.render('dashboard', { title: 'Dashboard', firstName: user.firstName, lastName: user.lastName, email: user.email, createdAt: user.createdAt });
})

module.exports = router;