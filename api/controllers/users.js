const db = require('../services/db');

module.exports = {
	async getUsers({ query: { role = 0 } }, res) {
		const result = await db.query('SELECT user_id, login, role FROM users WHERE role = ?', [role]);
		res.json({ status: 'OK', users: result[0] });
	},
};
