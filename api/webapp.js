const jwt = require('./utils/jwt');
module.exports = {

    getManagerData: (trash, driver, filter) => {
        let sendData = {};
			if (trash) {
				switch (filter) {
					case 'percent':filter = 'percent DESC';break;
					default:filter = 'idtrash ASC';
				}
				let trashs = await con.promise().query(`SELECT * FROM trashs ORDER BY ${filter}`);
				sendData.trashs = trashs[0];
			}
			if (driver) {
				let drivers = await con.promise().query('SELECT * FROM users WHERE login != \'manager\'');
				sendData.drivers = drivers[0];
			}
			return sendData;
        },

    
    getMarks: () => {
        let data = con.promise().query('SELECT * FROM trashs');
        return data[0];
    },

    getDriverPath: () => {
        let user = require('cookie').parse(socket.request.headers.cookie).login;
        if (!jwt.verifyJWT(user)) {return;}
        user = jwt.decodeJWT(user).login;
        
        let data = await con.promise().query('SELECT idtrash, lat, lng FROM trashs WHERE idtrash IN (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(users.way, \',\', numbers.n), \',\', -1) name FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers INNER JOIN users ON CHAR_LENGTH(users.way)-CHAR_LENGTH(REPLACE(users.way, \',\', \'\'))>=numbers.n-1 WHERE login = ? ORDER BY n)', [user]);
        socket.emit('sendDriverPath', data[0].map(el => [el.lat, el.lng]));
    }
};



socket.on('getDriverPath', async () => {
    let user = require('cookie').parse(socket.request.headers.cookie).login;
    if (!jwt.verifyJWT(user)) {return;}
    user = jwt.decodeJWT(user).login;
    
    let data = await con.promise().query('SELECT idtrash, lat, lng FROM trashs WHERE idtrash IN (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(users.way, \',\', numbers.n), \',\', -1) name FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers INNER JOIN users ON CHAR_LENGTH(users.way)-CHAR_LENGTH(REPLACE(users.way, \',\', \'\'))>=numbers.n-1 WHERE login = ? ORDER BY n)', [user]);
    socket.emit('sendDriverPath', data[0].map(el => [el.lat, el.lng]));
});