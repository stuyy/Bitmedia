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
router.post('/status', isUserAuthenticated, async (req, res) => {

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

router.get('/task', isUserAuthenticated, async(req, res) => {
    let userTasks = await Task.findAll({ where: { authorId: req.user.dataValues.email, completed: false }, order: [['createdAt', 'DESC']]}).catch(err => console.log(err));
    if(userTasks) {
        userTasks = userTasks.map(m => m.dataValues);
        res.status(200).send(userTasks);
    }
    else {
        res.status(403).end();
    }
});

router.post('/task', isUserAuthenticated, async (req, res) =>  {
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

router.delete('/task', isUserAuthenticated, async (req, res) => {
    console.log(req.body);
    // Find Task by ID.
    let task = await Task.findByPk(req.body.id).catch(err => console.log(err));
    if(task) {
        let f = await task.destroy().catch(err => console.log(err));
        res.send(202).send(202);
    }
});

router.put('/task', isUserAuthenticated, async (req, res) => {
    let ids = req.body;
    console.log(ids);
    for(let i = 0; i < ids.length; i++) {
        console.log(ids[i].id);
        let task = await Task.update({ completed: true }, { where: { id: ids[i].id }}).catch(err => console.log(err));
    }
    res.send(200);
});
module.exports = router;
