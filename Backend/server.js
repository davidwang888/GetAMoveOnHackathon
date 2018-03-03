let express = require('express');
let http = require('http');
let config = require('./config.json');
let fs = require('fs');
let Database = require('./database');

let db = new Database(config.mysql);

let app = express();

//setup routes
app.get('/test', function (req, res) {
    res.send(__dirname);
});

app.get('*', function(req, res) {
    let url = req.url;

    if (url === '/') url = '/index.html';

    let reqPath = __dirname + config.sepChar + 'public' + url;

    if (!fs.existsSync(reqPath)) {
        return res.redirect('/' + config.errPage);
    }

    res.sendFile(reqPath);
});

let httpServer = http.createServer(app);

httpServer.listen(config.port, function() {
    console.log(`Listening on ${config.port}`);
});