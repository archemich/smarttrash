const jwt = require('./jwt');
module.exports = function (io, con) {
	io.on('connection', (socket) => {
		socket.on('addWay', (login, way) => {con.update('users', {login, way}, () => {}); con.query('UPDATE trashs SET forClean = 1 WHERE idtrash IN (?)', [way.split(',')], () => {})});
		socket.on('delWay', (login) => {con.queryValue('SELECT way FROM users WHERE login = ?', [login], (err, way) => {con.query('UPDATE trashs SET forClean = 0 WHERE idtrash IN (?)', [way.split(',')], () => {})}); con.update('users', {login, way: null}, () => {})});
	});
};