const express = require('express')
    , router = express.Router()
    , AuthController = require('../controllers/auth.controller')
    ;

router
    .post('/login',AuthController.login)

module.exports = router


