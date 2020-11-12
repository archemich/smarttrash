const router = require('express').Router(),
	trashCtrl = require('../controllers/trash'),
	upload = require('multer')({ dest: 'uploads/', fileFilter: require('../controllers/multer') });

router.route('/').get(trashCtrl.getTrash).put(trashCtrl.updateTrash);

router.route('/upload').post(upload.single('file'), trashCtrl.uploadCSV);

module.exports = router;
