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
const isAuthorized = (req, res, next) => req.user ? next() : res.status(403).redirect('/login');

router.get('/', isAuthorized, async (req, res) => {
    let userTasks = await Task.findAll({ where: { authorId: req.user.dataValues.email, completed: false }, order: [['createdAt', 'DESC']]}).catch(err => console.log(err));
        
    if(userTasks) {
        userTasks = userTasks.map(m => {
            delete m.dataValues.authorId
            return m.dataValues });

        res.status(200).render('routes/tasks', {
            title: 'Tasks',
            routes: CLIENT_ROUTES,
            activeRoute: 'Tasks',
            userTasks,
            firstName: null,
            lastName: null
        });
    }
    else {
        res.status(403).end();
    }
});

router.get('/completed', isAuthorized, async (req, res) => {
    try {
        let completedTasks = await Task.findAll({ 
            where: { 
                authorId: req.user.dataValues.email, 
                completed: true }, 
            order: [['createdAt', 'DESC']] 
        });
        if(completedTasks) {
            res.status(200).render('routes/completedtasks', {
                title: 'Completed Tasks',
                completedTasks,
                activeRoute: 'Completed',
                routes: [{ name: 'Back', url: '/task'}],
                firstName: null,
                lastName: null
            });
        }
    }
    catch(err) {
        res.status(403).end();
    }
});

module.exports = router;    