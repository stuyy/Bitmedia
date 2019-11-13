const authRoute = require('../routes/auth');
const dashboardRoute = require('../routes/dashboard');
const userRoute = require('../routes/user');
const taskRoute = require('../routes/task');
const mainRoute = require('../routes/main');
const accountRoute = require('../routes/account');

module.exports = class RouteHandler {
    static register(app) {
        app.use('/auth', authRoute);
        app.use('/dashboard', dashboardRoute);
        app.use('/user', userRoute);
        app.use('/task', taskRoute);
        app.use('/', mainRoute);
        app.use('/account', accountRoute);
        console.log('Registered routes.');
    }
}