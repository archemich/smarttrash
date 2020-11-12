const dbInteractor = require('../services/dbinteractor'),
	jwt = require('../utils/jwt'),
	bcrypt = require('bcrypt'),
	salt = 10;

module.exports = {
	async login({ body }, res) {
		let user = await dbInteractor.getUser(body.login);

		if (!user) {
			res.status(422).json({ error: { message: 'User not found' } });
			return;
		}

		if (!bcrypt.compareSync(body.password, user.password)) {
			res.status(401).json({ message: 'Wrong login or password' });
			return;
		}

		res.json({ status: 'OK', token: jwt.generateJWT({ login: user.login }) });
	},

	async register({ body: { password } }, res) {
		res.json({ crypt: bcrypt.hashSync(password, salt) });
	},
};
