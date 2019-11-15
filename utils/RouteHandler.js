const authRoute = require('../routes/auth');
const dashboardRoute = require('../routes/dashboard');
const postRoute = require('../routes/post');
const taskRoute = require('../routes/task');
const mainRoute = require('../routes/main');
const accountRoute = require('../routes/account');
const settingsRoute = require('../routes/settings');

module.exports = class RouteHandler {
    static register(app) {
        app.use('/', mainRoute);
        app.use('/auth', authRoute);
        app.use('/dashboard', dashboardRoute);
        app.use('/post', postRoute);
        app.use('/task', taskRoute);
        app.use('/account', accountRoute);
        app.use('/settings', settingsRoute);
        console.log('Registered routes.');
    }
}