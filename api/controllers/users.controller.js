const UsersService = require('../services/users.service');

module.exports = {
    // checkAccess: (req, res) => {
    //     if (!req.cookies.login) {res.redirect('/login'); return;}
    //     if (!jwt.verifyJWT(req.cookies.login)) {res.clearCookie('login');res.redirect('/login');return;}
        
    //     let user = jwt.decodeJWT(req.cookies.login).login;
    //     if (['manager'].indexOf(user) == -1 && req.originalUrl == '/manager') {res.redirect('/driver'); return;}
    //     else if (['manager'].indexOf(user) != -1 && req.originalUrl == '/driver') {res.redirect('/manager'); return;}
        
    //     res.status(200).sendFile(__projectdir + '/views/manager.html');
    // },

    getManagerData: async (req, res) => {
        console.log(req.body);
        if (!req.body) 
            return res.status(400).send("No data recieved");
        trash = req.body.trash;
        driver = req.body.driver;
        filter = req.body.filter;
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
			return res.status(200).json(sendData);
        },
        
    getDriverPath: (req, res) => {
        let user = require('cookie').parse(socket.request.headers.cookie).login;
        if (!jwt.verifyJWT(user)) {
            return res.status(401).json({message: "User unauthorized"});
        }
        user = jwt.decodeJWT(user).login;
        let data = await UsersService.getDriverPath();
        return res.status(200).json({data: data[0].map(el => [el.lat, el.lng])});
	}
}