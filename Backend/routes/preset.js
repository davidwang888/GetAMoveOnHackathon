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
            res.redirect('/presets.html');
        });
        this.router.post('/edit', function(req, res) {
            let body = req.body;

            let items = Object.keys(body).filter(key => key.startsWith('item')).map(key => parseInt(key.substring(4)));

            let userID = req.session.userID;
            let presetID = req.presetID;
            db.editPreset(userID, presetID, items);
            res.redirect('/presets.html');
        });
        this.router.post('/delete', function(req, res) {
            let body = req.body;
            let presetID = body.presetID;
            db.deletePreset(presetID);
            res.redirect('/presets.html');
        });
    }

    route() {
        return this.router;
    }
}

module.exports = PresetRouter;
