const { readFileSync } = require('fs');

module.exports = path => {
	const [listFields, ...rows] = readFileSync(path)
		.toString()
		.replace(/\r/g, '')
		.split('\n')
		.filter(Boolean)
		.map(el => el.split(','));

	return rows.map(row => row.reduce((pr, cr, ind) => ({ ...pr, [listFields[ind]]: cr ?? null }), {}));
};
