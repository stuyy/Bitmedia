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

        let userTasks = await Task.findAll({ where: { authorId: req.user.dataValues.email, completed: false }, order: [['createdAt', 'DESC']]}).catch(err => console.log(err));
        
        if(userTasks) {
            userTasks = userTasks.map(m => {
                delete m.dataValues.authorId
                return m.dataValues });

            res.status(200).render('routes/tasks', {
                title: 'Tasks',
                routes: CLIENT_ROUTES,
                activeRoute: 'Tasks',
                userTasks
            });
        }
        else {
            res.status(403).end();
        }
        
    }
    else {
        res.status(403);
        res.redirect('/register')
    }
});


module.exports = router;    