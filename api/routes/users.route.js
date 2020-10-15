const express = require('express'),
    router = express.Router(),
    UsersController = require('../controllers/users.controller');

    

    router
        .route('/')
        .get('/manager', UsersController.getManagerData)
        .get('/driver', UsersController.getDriverPath)

    module.exports = router;
