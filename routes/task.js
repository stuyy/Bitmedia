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
        res.render('routes/tasks', {
            title: 'Tasks',
            routes: CLIENT_ROUTES,
            activeRoute: 'Tasks'
        })
    }
    else {
        res.status(403);
        res.redirect('/register')
    }
});

module.exports = router;    