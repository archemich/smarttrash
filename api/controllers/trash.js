const dbInteractor = require('../services/dbinteractor');

module.exports = {
	async getTrash(req, res) {
		if (req.query.id) {
			let result = await dbInteractor.getTrashs(req.query.id);
			if (result) {
				return res.status(200).json({ data: { trashs: result } });
			} else return res.status(422).json({ error: { message: 'Trash was not found' } });
		} else {
			let result = await dbInteractor.getTrashs();
			if (result) {
				return res.status(200).json({ data: { trashs: result } });
			} else {
				return res.status(422).json({ error: { message: 'Trashes was not found' } }); //Мусорки не найдены.
			}
		}
	},

	async updateTrash(req, res) {
		if (!req.body.per || !req.body.id || !req.body.batt) {
			res.status(400).json({ error: { message: "Can't update trash" } });
			return;
		}
		console.log(req.body);
		let result = await dbInteractor.updateTrash(req.body.id, req.body.per, req.body.batt);
		if (result) return res.status(200).json({ data: { result } });
	},

	async uploadCSV(req, res) {
		let file = req.file;
		console.log(file);
		if (!file) {
			res.status(400).json({ error: { message: 'Uploading error' } });
			return;
		}
		let result = await dbInteractor.loadCSV(req.file.path, trashs);
		res.status(200).json({ message: 'File has been uploaded', data: { result } });
	},
};
