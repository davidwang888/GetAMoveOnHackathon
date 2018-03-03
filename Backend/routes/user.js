let router = require('express').Router();

router.post('/register', function (req, res) {
    let body = req.body;

    let realname = body.realname;
    let username = body.username;
    let password = body.password;
    let workoutCategory = body.workoutCategory;
});

module.exports = router;