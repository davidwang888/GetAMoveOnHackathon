let express = require('express');

class PresetRouter {
    constructor(db) {
        this.router = express.Router();
        this.router.post('/add', function(req, res) {
            let body = req.body;
            let userID = req.session.userID;
            let items = body.items;
            let name = body.name;
            db.addPreset(userID, items, name);
        });
        this.router.post('/edit', function(req, res) {
            let body = req.body;
            let userID = req.session.userID;
            let presetID = req.presetID;
            let items = body.items;
            db.edit(userID, presetID, items);
        })
        this.router.post('/delete', function(req, res) {
            let body = req.body;
            let presetID = body.presetID;
            db.deletePreset(presetID);
        });
    }
}

module.exports = PresetRouter;
