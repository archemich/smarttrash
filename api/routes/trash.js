const router = require('express').Router(),
	trashCtrl = require('../controllers/trash'),
	uploadCtrl = require('../controllers/multer');

router.route('/').get(trashCtrl.getTrash).put(trashCtrl.updateTrash);

router.route('/upload').post(uploadCtrl, trashCtrl.uploadCSV);

module.exports = router;
