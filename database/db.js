const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const database = path.join(__dirname, 'backend_db.db');

let db = new sqlite3.Database(database, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createTables();
    } else if (err) {
        console.log("Getting error " + err);
        exit(1);
    }
});

function createTables() {
    db.run(`
   CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY, cours TEXT ,duration TEXT);
        `);
    console.log('Creation table course');
    db.run(`
             CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, firstName TEXT ,lastName TEXT,email  TEXT,telephone TEXT);
                 `);
    console.log('Creation table students');
}


createTables();

module.exports = db;