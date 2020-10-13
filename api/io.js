const jwt = require('./jwt');
module.exports = function (io, con) {
	io.on('connection', (socket) => {
		
		socket.on('getMarks', async () => {
			let data = await con.promise().query('SELECT * FROM trashs');
			socket.emit('sendMarks', data[0]);
		});
		
		socket.on('getDriverPath', async () => {
			let user = require('cookie').parse(socket.request.headers.cookie).login;
			if (!jwt.verifyJWT(user)) {return;}
			user = jwt.decodeJWT(user).login;
			
			let data = await con.promise().query('SELECT idtrash, lat, lng FROM trashs WHERE idtrash IN (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(users.way, \',\', numbers.n), \',\', -1) name FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers INNER JOIN users ON CHAR_LENGTH(users.way)-CHAR_LENGTH(REPLACE(users.way, \',\', \'\'))>=numbers.n-1 WHERE login = ? ORDER BY n)', [user]);
			socket.emit('sendDriverPath', data[0].map(el => [el.lat, el.lng]));
		});
		
		socket.on('getManagerData', async (data, filter) => {
			let sendData = {};
			if (data.trash) {
				switch (filter) {
					case 'percent':filter = 'percent DESC';break;
					default:filter = 'idtrash ASC';
				}
				let trashs = await con.promise().query(`SELECT * FROM trashs ORDER BY ${filter}`);
				sendData.trashs = trashs[0];
			}
			if (data.driver) {
				let drivers = await con.promise().query('SELECT * FROM users WHERE login != \'manager\'');
				sendData.drivers = drivers[0];
			}
			socket.emit('sendManagerData', sendData);
		});
		
		socket.on('addWay', (login, way) => {con.update('users', {login, way}, () => {}); con.query('UPDATE trashs SET forClean = 1 WHERE idtrash IN (?)', [way.split(',')], () => {})});
		socket.on('delWay', (login) => {con.queryValue('SELECT way FROM users WHERE login = ?', [login], (err, way) => {con.query('UPDATE trashs SET forClean = 0 WHERE idtrash IN (?)', [way.split(',')], () => {})}); con.update('users', {login, way: null}, () => {})});
	});
};