const router = require('express').Router(),
	usersCtrl = require('../controllers/users'),
	upload = require('multer')({ dest: 'uploads/', fileFilter: require('../controllers/multer') });

router.route('/').get(usersCtrl.getUsers);

router.route('/manager').get(usersCtrl.getManagerData);

// router
//     .route('/driver')
//     .get(usersCtrl.getDriverPath)
//     ;

router.route('/upload').post(upload.single('file'), usersCtrl.uploadCSV);

module.exports = router;
