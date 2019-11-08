const router = require('express').Router();
const User = require('../models/User');
const Status = require('../models/StatusUpdate');
const Task = require('../models/Task');

function isUserAuthenticated(req, res, next) {
    if(req.user) next();
    else {
        res.status(403).redirect('/login')
    }
}

router.get('/', (req, res) => {
    if(req.user) {
        res.send("user")
    }
    else {
        res.status(403);
        res.redirect('/register')
    }
});

router.get('/post/', isUserAuthenticated, (req, res) => {
    res.send("Yeet")
});

router.post('/post/status', isUserAuthenticated, async (req, res) => {

    let user = req.user.dataValues;
    console.log(req.body)
    try {
        await Status.create({
            author: user.firstName + " " + user.lastName,
            authorId: user.email,
            statusContent: req.body.status
        });
        res.status(200).end();
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
});

router.post('/post/task', isUserAuthenticated, async (req, res) =>  {
    let user = req.user.dataValues;
    console.log(req.body);
    let newTask = await Task.create({
        author: user.firstName + ' ' + user.lastName,
        title: req.body.title,
        description: req.body.desc,
        authorId: user.email,
        completed: false
    }).catch(err => console.log(err));

    if(newTask)
        res.send(201);
});

router.delete('/post/task', isUserAuthenticated, async (req, res) => {
    console.log(req.body);
    // Find Task by ID.
    let task = await Task.findByPk(req.body.id).catch(err => console.log(err));
    if(task) {
        let f = await task.destroy().catch(err => console.log(err));
        res.send(202).send(202);
    }
})
module.exports = router;
