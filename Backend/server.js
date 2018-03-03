let express = require('express');
let session = require('express-session');
let http = require('http');
let bodyParser = require('body-parser');
let fs = require('fs');
let Database = require('./database');
let config = require('./config.json');

//import routes
let UserRouter = require('./routes/user');

let db = new Database(config.mysql);

let app = express();

let noLogin = ['/index.html'];
let pages = ['/index.html', '/page.html', 'profile.html', 'select_items.html', 'setup.html']

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/user', new UserRouter(db).route());

//setup routes
app.get('*', function(req, res) {
    let url = req.url.split('?')[0];

    if (url === '/') url = '/index.html';

    if (req.session.userID >= 0) {
        if (url == '/index.html') return res.redirect(config.sepChar + config.page.homePage)
    } else {
        if (pages.includes(url)) url = '/index.html';

    }

    let reqPath = __dirname + config.sepChar + 'public' + url;

    if (!fs.existsSync(reqPath)) {
        return res.redirect(config.sepChar + config.page.errPage);
    }

    res.sendFile(reqPath);
});

let httpServer = http.createServer(app);

httpServer.listen(config.port, function() {
    console.log(`Listening on ${config.port}`);
});
