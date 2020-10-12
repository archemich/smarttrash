const jws = require('jws')
		, header = {alg: 'HS256', typ: 'JWT'}
		, SECRET_KEY = 'hy9w23g'
		;

module.exports = {

	generateJWT: (payload = {}) => {
		payload.iat = Math.round(+new Date() / 1000);
		return jws.sign({header, payload, secret: SECRET_KEY});
	},

	verifyJWT: (jwt) => {
		return jws.decode(jwt) ? jws.verify(jwt, header.alg, SECRET_KEY) : false;
	},

	decodeJWT: (jwt) => {
		return jws.decode(jwt).payload;
	}

};