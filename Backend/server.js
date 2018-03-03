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

let noLogin = [config.page.indexPage, config.page.errPage];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/user', new UserRouter(db).route());

function getCategoriesWithItems(callback) {
    db.getCategories(function (categories) {
        let proms = [];
        for (let i = 0; i < categories.length; i++) {
            const cat = categories[i];
            proms.push(new Promise(function (resolve, reject) {
                db.getItems(cat.id, function (items) {
                    resolve(items);
                });
            }));
        }

        Promise.all(proms).then(function (items) {
            for (let i = 0; i < categories.length; i++) {
                categories[i].items = items[i];
            }
            callback(categories);
        });
    });
}

function replaceContent(url, filePath, callback) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) throw err;
        if (url === '/utilities.js') {
            getCategoriesWithItems(function (categories) {
                let serverData = JSON.stringify({
                    categories: categories
                });
                let str = JSON.stringify(serverData);
                data = data.replace(/%SERVERDATA%/g, str.substring(1, str.length - 1));
                callback(data);
            });
        } else {
            callback(data);
        }
    });
}

//setup routes
app.get('*', function(req, res) {
    let url = req.url.split('?')[0];

    if (url === config.sepChar) url = config.sepChar + config.page.indexPage;

    let reqPath = __dirname + config.sepChar + 'public' + url;

    if (!fs.existsSync(reqPath)) {
        return res.redirect(config.sepChar + config.page.errPage);
    }

    if (req.session.userID >= 0) {
        if (url == config.sepChar + config.page.indexPage) return res.redirect(config.sepChar + config.page.homePage)
    } else {
        if (!noLogin.includes(url.substring(1))) return res.redirect(config.sepChar + config.page.indexPage);
    }

    if (url === '/utilities.js') {
        replaceContent(url, reqPath, function (cont) {
            res.send(cont);
        });
    } else {
        res.sendFile(reqPath);
    }
});

let httpServer = http.createServer(app);

httpServer.listen(config.port, function() {
    console.log(`Listening on ${config.port}`);
});
