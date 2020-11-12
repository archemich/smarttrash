const dbInteractor = require('../services/dbinteractor'),
	jwt = require('../utils/jwt'),
	bcrypt = require('bcrypt');

module.exports = {
	async login({ body }, res) {
		let user = await dbInteractor.getUser(body.login);

		if (!user) {
			res.status(422).json({ error: { message: 'User not registered' } });
			return;
		}

		if (!bcrypt.compareSync(body.password, user.password)) {
			res.status(401).json({ error: { message: 'Wrong login or password' } });
			return;
		}

		res.json({ status: 'OK', token: jwt.generateJWT({ login: user.login }) });
	},

	async register({ body: { password } }, res) {
		const salt = bcrypt.genSaltSync();
		res.json({ crypt: bcrypt.hashSync(password, salt) });
	},
};
