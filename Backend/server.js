let express = require('express');
let http = require('http');
let config = require('./config.json');

let app = express();

let httpServer = http.createServer(app);

httpServer.listen(config.port, function() {
    console.log(`Listening on ${config.port}`);
});