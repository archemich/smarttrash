const mysql = require('mysql2');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'trash',
	password: 'trash',
	database: 'trash',
	charset: 'utf8mb4',
});
con.on('error', e => console.log(e));
con.connect(err => {
	if (err) return console.error('error connecting: ' + err.stack);
	console.log('mysql2 as id ' + con.threadId);
});

con.query('SET SESSION wait_timeout = 604800');

module.exports = con.promise();
