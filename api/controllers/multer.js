const limits = {
	fileSize: 5 * 1024 * 1024,
};

module.exports = require('multer')({ dest: './uploads', fileFilter: csvFileFilter, limits }).single('file');

function csvFileFilter(req, file, cb) {
	if (file.mimetype === 'text/csv') cb(null, true);
	else cb(null, false);
}
