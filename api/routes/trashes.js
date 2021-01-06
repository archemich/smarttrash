const router = require('express').Router(),
	trashCtrl = require('../controllers/trashes'),
	uploadCtrl = require('../controllers/multer'),
	{ verifyToken, onlyManager } = require('../controllers/auth');

router.route('/').get(trashCtrl.getTrashes);

router.route('/:id').put(trashCtrl.updateTrash);

router.route('/upload').post(verifyToken, onlyManager, uploadCtrl, trashCtrl.upload);

module.exports = router;
