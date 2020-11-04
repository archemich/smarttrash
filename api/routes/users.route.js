const router = require('express').Router()
    , UsersController = require('../controllers/users.controller')
    , upload = require('multer')({dest: 'uploads/', fileFilter: (require("../controllers/multer"))});
    ;

router
    .route('/manager')
    .get(UsersController.getManagerData)
    ;

router
    .route('/driver')
    .get(UsersController.getDriverPath)
    ;

router
    .route('/upload')
    .post(upload.single("file"), UsersController.uploadCSV)

module.exports = router;
