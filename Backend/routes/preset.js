let express = require('express');

class PresetRouter {
    constructor(db) {
        this.router = express.Router();
        this.router.post('/add', function(req, res) {
            let body = req.body;
            let items = body.items;
            db.addPreset(items);
        });

        this.router.post('/delete', function(req, res) {
            let body = req.body;
            let items = body.items;
            db.deletePreset(items);
        });
    }
}
