const db = require('../services/db');
const exportCSV = require('../utils/exportCSV');

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

		if (!trashes[0].length) {
			res.status(422).json({ error: { message: 'Trashes was not found' } });
			return;
		}

		res.json({
			status: 'OK',
			trashes: trashes[0].map(el => ({ ...el, lastUpdate: el.lastUpdate.valueOf() })),
		});
	},

	async updateTrash({ params: { id }, body: { percent, battery } }, res) {
		if (!percent || !battery) {
			res.status(400).json({ error: { message: 'Some parameters are missing' } });
			return;
		}

		await db.query(
			'UPDATE trashes SET percent = ?, battery = ?, packages = packages + 1 WHERE trash_id = ?',
			[percent, battery, id]
		);
		res.json({ status: 'OK' });
	},

	async upload({ file }, res) {
		console.log(file);

		if (!file) {
			res.status(400).json({ error: { message: 'Uploading error' } });
			return;
		}

		for (const { lat, lng } of exportCSV(file.path)) {
			if (!lat || !lng) {
				res.status(422).json({ error: { message: 'Csv dont contain required field. Some do not create.' } });
				return;
			}

			await db.query('INSERT INTO trashes(lat, lng) VALUE (?, ?)', [lat, lng]);
		}

		res.json({ status: 'OK' });
	},
};
