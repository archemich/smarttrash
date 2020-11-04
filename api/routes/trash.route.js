const router = require('express').Router()
    , TrashController = require('../controllers/trash.controller')
    , upload = require('multer')({dest: 'uploads/', fileFilter: (require("../controllers/multer"))});
    ;


router
    .route('/')
    .get(TrashController.getTrash)
    .put(TrashController.updateTrash)

router
    .route('/upload')
    .post(upload.single("file"), TrashController.uploadCSV)

module.exports = router;