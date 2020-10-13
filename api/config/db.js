const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "trash",
    password: "trash",
    database: "trash"
}).promise();

pool.query('SET SESSION wait_timeout = 604800}');
module.exports = pool;
