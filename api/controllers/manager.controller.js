const ManagerService = require('../services/manager.service');

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
				let trashs = ManagerService.getTrashs(filter);
				sendData.trashs = trashs[0];
			}
			if (driver) {
				let drivers = ManagerService.getDrivers();
				sendData.drivers = drivers[0];
			}
			return res.status(200).send(sendData);
        },

      
    
}