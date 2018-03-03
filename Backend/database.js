let mysql = require('mysql');

class Database {

    constructor(connInfo) {
        this.conn = null;
        this.connect(connInfo);
    }

    connect(connInfo) {
        this.conn = mysql.createConnection(connInfo);
        this.conn.connect(function (err) {
            if (err) {
                console.log('Mysql connection failed:', err);
                return process.exit();
            }
            console.log('Mysql connection success');
        });
    }

    registerUser(realname, username, password, categoryID, callback) {
        let $this = this;

        this.conn.query('SELECT * FROM user WHERE username=?', username, function (err, results, fields) {
            if (err) throw err;

            if (results.length > 0) {
                callback('Username taken');
            } else {
                $this.conn.query('INSERT INTO user(username, password, name, categoryID) VALUES(?, ?, ?, ?)', [username, password, realname, categoryID], function (err) {
                    if (err) throw err;
                    callback('Created account successfully');
                });
            }
        })
    }
}

module.exports = Database;