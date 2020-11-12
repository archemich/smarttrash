const db = require('../services/db');

module.exports = {
	async getTrashes({ query: { filter } }, res) {
		switch (filter) {
			case 'percent':
				filter = 'percent DESC';
				break;
			default:
				filter = 'trash_id ASC';
		}

		let trashes = await db.query('SELECT * FROM trashes ORDER BY ?', [filter]);
		trashes = trashes[0].map(el => ({ ...el, lastUpdate: el.lastUpdate.valueOf() }));

		if (!trashes.length) {
			res.status(422).json({ error: { message: 'Trashes was not found' } });
			return;
		}

		res.json({ status: 'OK', trashes });
	},

	async getTrash({ params: { id } }, res) {
		let trash = await db.query('SELECT * FROM trashes WHERE trash_id = ?', [id]);
		trash = trash[0][0];

		if (!trash) {
			res.status(422).json({ error: { message: 'Trash was not found' } });
			return;
		}

		trash.lastUpdate = trash.lastUpdate.valueOf();

		res.json({ status: 'OK', trash });
	},

	async updateTrash({ params: { id }, body: { percent, battery } }, res) {
		if (!percent || !battery) {
			res.status(400).json({ error: { message: 'Some parameters are missing' } });
			return;
		}

		await db.query('UPDATE trashes SET percent = ?, battery = ? WHERE trash_id = ?;', [percent, battery, id]);
		res.json({ status: 'OK' });
	},

	async uploadCSV({ file }, res) {
		console.log(file);

		if (!file) {
			res.status(400).json({ error: { message: 'Uploading error' } });
			return;
		}

		let result = await dbInteractor.loadCSV(file.path, trashs);
		res.status(200).json({ message: 'File has been uploaded', data: { result } });
	},
};
