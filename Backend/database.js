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

    getRigor(callback) {
    this.conn.query('SELECT * FROM `workout_category`', function (err, results) {
            callback(results);
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

    addPreset(userID, items, name, callback) {
        let $this = this;
        this.conn.query('SELECT MAX(id) from preset', [], function(err, results, fields) {
            if (err) throw err;
            let max = results[0]['MAX(id)'];
            if (!max) max = 0;
            else max++;

            let proms = [];

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                proms.push(new Promise(function (resolve, reject) {
                    $this.conn.query('INSERT INTO `preset`(`id`, `itemID`) VALUES (?,?)',[max, item], function (err) {
                        if (err) throw err;
                        resolve();
                    });
                }));
            }

            Promise.all(proms).then(function () {
                $this.conn.query('INSERT INTO `user-preset`(`userID`, `presetID`, `name`) VALUES (?,?,?)',[userID, max, name], function (err) {
                    if (err) throw err;
                    if (callback) callback();
                });
            });
        });
    }

    editPreset(userID, presetID, items, callback) {
        let $this = this;

        this.conn.query('SELECT `name` from `user-preset` WHERE presetID=?', presetID, function(err, results, fields) {
            if (err) throw err;

            $this.editPresetWithName(userID, presetID, items, results[0].name, callback);
        });
    }

    editPresetWithName(userID, presetID, items, name, callback) {
        this.deletePreset(presetID);
        if (items.length > 0)
            this.addPreset(userID, items, name, callback);
        else {
            callback();
        }
    }

    deletePreset(presetID) {
        this.conn.query('DELETE FROM `preset` WHERE id=?', presetID);
    }

    getPresets(userID, callback) {
        let $this = this;
        this.conn.query('SELECT * FROM `user-preset` WHERE userID=?', userID, function (err, results) {
            if (err) throw err;

            let proms = [];

            for (let i = 0; i < results.length; i++) {
                const presetID = results[i].presetID;
                proms.push(new Promise(function (resolve, reject) {
                    $this.conn.query('SELECT i1.id, i1.name FROM preset p1 JOIN item i1 ON p1.itemID = i1.id WHERE p1.id=?', presetID, function (err, results) {
                        if (err) throw err;

                        resolve(results);
                    });
                }));
            }

            Promise.all(proms).then(function (itemIDs) {
                let arr = [];
                for (let i = 0; i < results.length; i++) {
                    arr.push({
                        id: results[i].presetID,
                        name: results[i].name,
                        items: itemIDs[i]
                    });
                }
                callback(arr);
            });
        });
    }

    addRoutine(userID, workouts) {
        let max = 0;
        let $this = this;
        this.conn.query('SELECT MAX(id) from workout', [], function(err, results, fields) {
            if (err) throw err;
            if (results.length > 0) max = results[0].id + 1;
            else max = 0;
            for (workout in workouts) {
                $this.conn.query('INSERT INTO `routine`(`id`, `workoutID`) VALUES (?,?)',[max, workout]);
            }
            $this.conn.query('INSERT INTO `user-routine`(`userID`, `workoutID`) VALUES (?,?)',[userID, max]);
        });
    }

    editRoutine(routineID, workouts) {
        deletePreset(routineID);
        addPreset(userID, workouts);
    }

    deleteRoutine(routineID) {
        this.conn.query('DELETE FROM `routine` WHERE id=?', routineID);
    }

    getRoutines(userID, callback) {
        let $this = this;
        this.conn.query('SELECT * FROM `user-routine` WHERE userID=?', userID, function (err, results) {
            if (err) throw err;

            let proms = [];

            for (let i = 0; i < results.length; i++) {
                const routineID = results[i].routineID;
                proms.push(new Promise(function (resolve, reject) {
                    $this.conn.query('SELECT B.workoutID, A.name AS workoutName, B.numReps, B.secTime, B.categoryID AS difficulty FROM ( (SELECT w1.id, w1.name FROM workout w1 JOIN routine r1 ON w1.id = r1.workoutID WHERE r1.id=?) AS A JOIN  SELECT w2.workoutID, w2.numReps, w2.secTime, w2.categoryID FROM `workout-workout_category` w2 JOIN user u1 ON u1.categoryID = w2.categoryID WHERE u1.id = ?) AS B N A.id = B.workoutID )', [routineID, userID], function (err, results) {
                        if (err) throw err;

                        resolve(results);
                    });
                }));
            }

            Promise.all(proms).then(function (workoutIDs) {
                let arr = [];
                for (let i = 0; i < results.length; i++) {
                    arr.push({
                        id: results[i].routineID,
                        workouts: workoutIDs[i]
                    });
                }
                callback(arr);
            });
        });
    }
}

module.exports = Database;
