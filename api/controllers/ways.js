const db = require('../services/db');

module.exports = {
	async getWay({user, params}, res) {
		let id = user.id;
		if (params.id) {
			id = params.id;
		}
		const way = await db.query(
			'SELECT lat, lng FROM trashes_in_users LEFT JOIN trashes using(trash_id) WHERE user_id = ?',
			[id]
		);
		res.json({ status: 'OK', way: way[0] });
	},

	async create({ params: { id: userId }, body: { way } }, res) {
		if (!way || !way.length) {
			res.json({ error: { message: 'Way is missing' } });
			return;
		}

		for (const point of way) {
			await db.query('INSERT INTO trashes_in_users(user_id, trash_id) VALUE (?, ?)', [userId, point]);
		}

		res.json({ status: 'OK' });
	},

	async delete({ params: { id: userId } }, res) {
		await db.query('DELETE FROM trashes_in_users WHERE user_id = ?', [userId]);
		res.json({ status: 'OK' });
	},
};
