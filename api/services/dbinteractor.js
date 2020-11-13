const db = require('./db');

module.exports = {
	async addWay(login, trash_id) {
		let result = await db.query(
			'INSERT INTO trashes_in_users(user_id, trash_id) VALUES((SELECT user_id FROM users WHERE login = ?), ?;',
			[login, trash_id]
		);
		console.log(result);
		return result;
	},

	async delWay(trash_id) {
		let result = await db.query('DELETE FROM trashes_in_users WHERE trash_id = ?;', [trash_id]);
		console.log(result);
		return result;
	}
};
