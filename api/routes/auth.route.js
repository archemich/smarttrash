const router = require("express").Router()
    , AuthController = require('../controllers/auth.controller')
    ;

router
    .route('/login')
    .post(AuthController.login)

router
    .route('/regiter')
    .post(AuthController.register)

module.exports = router


