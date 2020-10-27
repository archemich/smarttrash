const UsersService = require('../services/users.service');

module.exports = {
    async getManagerData(req, res) {
        console.log(req.body);
        if (!req.body) 
            return res.status(400).json({error:{message: "Bad request"}});
        let {trash, driver, filter} = req.body;
        let sendData = {};
			if (trash) {
				switch (filter) {
                    case 'percent': 
                        filter = 'percent DESC'; break;
					default:

                        filter = 'idtrash ASC';
				}
				let trashs = UsersService.getTrashs(filter);
				sendData.trashs = trashs[0];
			}
			if (driver) {
				let drivers = UsersService.getDrivers();
				sendData.drivers = drivers[0];
			}
			return res.status(200).json({data: {sendData}});
        },
        
    async getDriverPath(req, res) {
        let user = require('cookie').parse(socket.request.headers.cookie).login;
        if (!jwt.verifyJWT(user)) {
            return res.status(401).json({error: {message: "User unauthorized"}});
        }
        user = jwt.decodeJWT(user).login;
        let data = await UsersService.getDriverPath();
        return res.status(200).json({data: data[0].map(el => [el.lat, el.lng])});
	}
}