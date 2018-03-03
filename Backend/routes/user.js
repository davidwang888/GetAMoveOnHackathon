let express = require('express');

class UserRouter {

    constructor(db) {
        this.router = express.Router();
        this.router.post('/register', function (req, res) {
            let body = req.body;

            let realname = body.realname;
            let username = body.username;
            let password = body.password;
            let workoutCategory = body.workoutCategory;

            db.registerUser(realname, username, password, workoutCategory, function (msg) {
                res.redirect('/index.html?msg=' + msg);
            });
        });
    }

    route() {
        return this.router;
    }
}



module.exports = UserRouter;