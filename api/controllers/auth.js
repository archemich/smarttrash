const db = require('../services/db'),
	jwt = require('../utils/jwt'),
	bcrypt = require('bcrypt');

module.exports = {
	async login({ body: { login, password } }, res) {
		let user = await db.query('SELECT * FROM users WHERE login = ?', [login]);
		user = user[0][0];

		if (!user) {
			res.status(422).json({ error: { message: 'User not registered' } });
			return;
		}

		if (!password || !bcrypt.compareSync(password, user.password)) {
			res.status(401).json({ error: { message: 'Wrong login or password' } });
			return;
		}

		res.json({
			status: 'OK',
			token: jwt.generateJWT({ id: user.user_id, role: user.role }),
			user: { ...user, password: undefined },
		});
	},

	async register({ body: { password } }, res) {
		res.json({ crypt: bcrypt.hashSync(password, bcrypt.genSaltSync()) });
	},
};
