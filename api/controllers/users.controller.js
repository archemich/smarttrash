const dbInteractor = require('../services/dbinteractor');

module.exports = {
    async getUsers(req, res) {
        let result = await dbInteractor.getUsers();
        return res.status(200).json({data: result});
    },

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
                        filter = 'trash_id ASC';
				}
				let trashs = dbInteractor.getTrashs(filter);
				sendData.trashs = trashs[0];
			}
			if (driver) {
				let drivers = dbInteractor.getDrivers();
				sendData.drivers = drivers[0];
			}
			return res.status(200).json({data: {sendData}});
        },
        
    // async getDriverPath(req, res) {
    //     user = jwt.decodeJWT(user).login;
    //     let data = await dbInteractor.getDriverPath();
    //     return res.status(200).json({data: data[0].map(el => [el.lat, el.lng])});
    // },
    
    async uploadCSV(req, res) {
        let file = req.file;
        console.log(file);
        if (!file) {
            res.status(400).json({ error: { message: "Uploading error" } });
            return;
        }
        let result = await dbInteractor.loadCSV(req.file.path, users)
        res.status(200).json({ message: "File has been uploaded", data: {result} });
    }
}