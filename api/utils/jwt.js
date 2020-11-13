const jws = require('jws'),
	header = { alg: 'HS256', typ: 'JWT' },
	SECRET_KEY = 'gf0jrjfi';

module.exports = {
	/**
	 * @function
	 * @param {Object} payload
	 * @returns {string}
	 */
	generateJWT: (payload = {}) => {
		payload.iat = Math.round(+new Date() / 1000);
		return jws.sign({ header, payload, secret: SECRET_KEY });
	},

	/**
	 * @function
	 * @param {string} jwt
	 * @returns {boolean}
	 */
	verifyJWT: jwt => {
		return jws.decode(jwt) ? jws.verify(jwt, header.alg, SECRET_KEY) : false;
	},

	/**
	 * @function
	 * @param {string} jwt
	 * @returns {Object}
	 */
	decodeJWT: jwt => {
		return jws.decode(jwt).payload;
	},
};
