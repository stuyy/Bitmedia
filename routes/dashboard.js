const router = require('express').Router();
const Status = require('../models/StatusUpdate');
const Task = require('../models/Task');
const CLIENT_ROUTES = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Blog', url: '/blog' },
    { name: 'Tasks', url: '/task' },
    { name: 'Updates', url: '/updates' },
    { name: 'Settings', url: '/settings' },
    { name: 'Logout', url: '/logout' }
];

router.get('/', async (req, res) => {
    if(req.user) {
        let user = req.user.dataValues;
        let status = await Status.findAll({ where: {
            authorId: user.email
        }, order: [['createdAt', 'DESC']]})
        .catch(err => console.log(err));

        let tasks  = await Task.findAll({
            where: { authorId: user.email },
            order: [['createdAt', 'DESC']]
        }).catch(err => console.log(err));

        let lastStatus = status.slice(0, 1).map(s => s.dataValues);

        lastStatus = lastStatus.length === 0 ? null : lastStatus.shift();

        let recentTasks = tasks.splice(0,3).map(t => t.dataValues);
        if(recentTasks.length === 0)
            recentTasks = null;

        console.log(recentTasks)
        res.render('routes/dashboard', { title: 'Dashboard', firstName: user.firstName, lastName: user.lastName, email: user.email, createdAt: user.createdAt, lastStatus: lastStatus, recentTasks: recentTasks, routes: CLIENT_ROUTES, activeRoute: 'Dashboard' });
    }
    else {
        res.status(403);
        res.redirect('/register')
    }
});

module.exports = router;    