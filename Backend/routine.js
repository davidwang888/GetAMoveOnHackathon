let express = require('express');

class RoutineRouter {
    constructor(db) {
        this.router = express.Router();
        this.router.post('/add', function(req, res) {
            let body = req.body;
            let workouts = body.workouts;
            db.addRoutine(workouts);
        });

        this.router.post('/delete', function(req, res) {
            let body = req.body;
            let workouts = body.workouts;
            db.deleteRoutine(workouts);
        });
    }
}

module.exports = RoutineRouter;
