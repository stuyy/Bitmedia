const router = require('express').Router();
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
    res.render('routes/settings', {
        title: 'Settings',
        routes: CLIENT_ROUTES,
        activeRoute: 'Settings',
        firstName: null,
        lastName: null
    });
});

module.exports = router;    