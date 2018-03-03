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
        });
    }

    loginUser(username, password, callback) {
        this.conn.query('SELECT * FROM user WHERE username=?', username, function(err, results, filds) {
            if (err) throw err;

            if (results.length == 0) {
                callback('Username not found', -1);
            } else {
                if (results[0].password != password) {
                    callback('Username and Password do not match', -1);
                } else {
                    callback('Login success', results[0].id);
                }
            }
        });
    }

    getCategories(callback) {
        this.conn.query('SELECT * FROM location_category', [], function(err, results, fields) {
            if (err) throw err;

            callback(results);
        });
    }

    getItems(categoryID, callback) {
        this.conn.query('SELECT * FROM item WHERE locationCategoryID=?', categoryID, function (err, results, fields) {
            if (err) throw err;

            callback(results);
        });
    }

    addPreset(items, callback) {
        let max = 0;
        let $this = this;
        this.conn.query('SELECT MAX(id) from routine', [], function(err, results, fields) {
            if (err) throw err;
            if (results.length > 0) max = results[0].id + 1;
            else max = 0;
            for (item in items) {
                $this.conn.query('INSERT INTO `preset`(`id`, `itemID`) VALUES (?,?)',[max, item]);
            }
        });

    }

    deletePreset(presetID, callback) {
        this.conn.query('DELETE FROM `preset` WHERE id=?', preset);
    }
}

module.exports = Database;
