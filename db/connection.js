const mysql = require('mysql2');
const util = require('util');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees',
});

db.query = util.promisify(db.query);

module.exports = db