const router = require("express").Router()
    , AuthController = require('../controllers/auth.controller')
    ;

router
    .route('/login')
    .post(AuthController.login)

module.exports = router


