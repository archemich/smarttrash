const { verify } = require('jws');
const db = require('../services/db'),
	jwt = require('../utils/jwt'),
	bcrypt = require('bcrypt');

module.exports = {
	async login({ body: { login, password }}, res) {
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

	verify({body:{token}}, res) {
		let verify = jwt.verifyJWT(token);
		res.json(verify);
	},

	async register({ body: { password } }, res) {
		res.json({ crypt: bcrypt.hashSync(password, bcrypt.genSaltSync()) });
	},

	async verifyToken(req, res, next) {
		if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
			res.status(401).json({ error: { message: 'InvalidToken', messageCode: 0, type: 'Unauthorized', code: 401 } });
			return;
		}

		req.user = req.headers.authorization.split(' ')[1];

		if (!jwt.verifyJWT(req.user)) {
			res.status(401).json({ error: { message: 'InvalidToken', messageCode: 0, type: 'Unauthorized', code: 401 } });
			return;
		}

		req.user = jwt.decodeJWT(req.user);
		next();
	},

	onlyManager({ user: { role } }, res, next) {
		if (role == 1) return next();
		res.status(403).json({ error: { message: 'AccessDenied', messageCode: 0, type: 'Forbidden', code: 403 } });
	},

	onlyDriver({ user: { role } }, res, next) {
		if (role == 0) return next();
		res.status(403).json({ error: { message: 'AccessDenied', messageCode: 0, type: 'Forbidden', code: 403 } });
	},
};
