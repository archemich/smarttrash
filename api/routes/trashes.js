const router = require('express').Router(),
	trashCtrl = require('../controllers/trashes'),
	uploadCtrl = require('../controllers/multer');

router.route('/').get(trashCtrl.getTrashes);

router.route('/:id').get(trashCtrl.getTrash).put(trashCtrl.updateTrash);

router.route('/upload').post(uploadCtrl, trashCtrl.upload);

module.exports = router;
