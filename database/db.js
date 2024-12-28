const sqlite3 = require('sqlite3').verbose(); 
const path = require('path');
const database = path.join(__dirname, 'backend_db.db');

console.log('database',database)
let db= new sqlite3.Database(database, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
    }
});

function createDatabase() {
    var newdb = new sqlite3.Database(database, (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });

    console.log('Creation de la BD');
}


function createTables(newdb) {
    db.run(`
   CREATE TABLE IF NOT EXISTS course (id SERIAL PRIMARY KEY, cours TEXT ,duration TEXT);
        `);

        db.run(`
             CREATE TABLE IF NOT EXISTS students (id SERIAL PRIMARY KEY, firstName TEXT ,lastName TEXT,email  TEXT,telephone TEXT);
                 `);
        console.log('Creation des tables');
}


createDatabase();
createTables();