const express = require('express')
    , router = express.Router()
    , AuthController = require('../controllers/auth.controller')
    ;

router
    .post(AuthController.login)


module.exports = router


