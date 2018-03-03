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
        this.router.post('/login', function(req, res) {
            let body = req.body;

            let username = body.username;
            let password = body.password;

            db.loginUser(username, password,
            function(msg, userID) {
                req.session.userID = userID;
                if (req.session.userID == -1)  res.redirect('/index.html?msg=' + msg);
                else res.redirect('/home.html');
            });
        });
    }

    route() {
        return this.router;
    }
}



module.exports = UserRouter;
