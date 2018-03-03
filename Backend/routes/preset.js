let express = require('express');

class PresetRouter {
    constructor(db) {
        this.router = express.Router();

        this.router.post('/add', function(req, res) {
            let body = req.body;
            let userID = req.session.userID;

            let presetID = body.presetID;
            let presetName = body.presetName;
            let items = Object.keys(body).filter(key => key.startsWith('item')).map(key => parseInt(key.substring(4)));

            if (presetID != -1) {
                db.editPresetWithName(userID, presetID, items, presetName, function () {
                    res.redirect('/presets.html');
                });
            } else {
                db.addPreset(userID, items, presetName, function () {
                    res.redirect('/presets.html');
                });
            }
        });

        this.router.post('/edit', function(req, res) {
            let body = req.body;

            let userID = req.session.userID;
            let presetID = parseInt(body.presetID);

            db.getPresets(userID, function (presets) {
                let preset = null;
                for (let i = 0; i < presets.length; i++) {
                    if (presets[i].id === presetID)preset = presets[i];
                }
                if (preset) {
                    req.session.tmpPreset = preset;
                    res.redirect('/select_items.html');
                } else {
                    res.redirect('/presets.html?msg=Preset not found');
                }
            });
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
