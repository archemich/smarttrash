const router = require('express').Router(),
	usersCtrl = require('../controllers/users'),
	uploadCtrl = require('../controllers/multer');

router.route('/').get(usersCtrl.getUsers);

router.route('/manager').get(usersCtrl.getManagerData);

// router
//     .route('/driver')
//     .get(usersCtrl.getDriverPath)
//     ;

router.route('/upload').post(uploadCtrl, usersCtrl.uploadCSV);

module.exports = router;
