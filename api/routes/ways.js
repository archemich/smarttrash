const router = require('express').Router(),
	waysCtrl = require('../controllers/ways'),
	{ verifyToken, onlyManager, onlyDriver } = require('../controllers/auth');

router.route('/me').get(verifyToken, onlyDriver, waysCtrl.getWay);

router
	.route('/:id')
	.post(verifyToken, onlyManager, waysCtrl.create)
	.delete(verifyToken, onlyManager, waysCtrl.delete);

module.exports = router;
