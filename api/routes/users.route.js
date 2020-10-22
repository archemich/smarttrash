const router = require('express').Router()
    , UsersController = require('../controllers/users.controller')
    ;

router
    .route('/manager')
    .get(UsersController.getManagerData)
    ;

router
    .route('/driver')
    .get(UsersController.getDriverPath)
    ;

module.exports = router;
