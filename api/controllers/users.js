const db = require('../services/db');

module.exports = {
	async getUsers({ query: { role = 0 } }, res) {
		const result = await db.query('SELECT user_id, login, role FROM users WHERE role = ?', [role]);
		res.json({ status: 'OK', users: result[0] });
	},

	// async getDriverPath(req, res) {
	//     user = jwt.decodeJWT(user).login;
	//     let data = await dbInteractor.getDriverPath();
	//     return res.status(200).json({data: data[0].map(el => [el.lat, el.lng])});
	// },

	async uploadCSV({ file }, res) {
		console.log(file);

		if (!file) {
			res.status(400).json({ error: { message: 'Uploading error' } });
			return;
		}

		let result = await dbInteractor.loadCSV(req.file.path, users);
		res.status(200).json({ message: 'File has been uploaded', data: { result } });
	},
};
