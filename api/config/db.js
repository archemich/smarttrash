const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "trash",
    password: "trash",
    database: "trash",
    charset: "utf8mb4"
}).promise();

con.query('SET SESSION wait_timeout = 604800}');
module.exports = con;
