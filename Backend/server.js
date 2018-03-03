let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let config = require('./config.json');
let fs = require('fs');
let Database = require('./database');

//import routes
let UserRouter = require('./routes/user');

let db = new Database(config.mysql);

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/user', new UserRouter(db).route());

//setup routes
app.get('*', function(req, res) {
    let url = req.url.split('?')[0];

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