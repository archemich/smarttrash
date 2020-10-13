const express = require('express'),
    router = express.Router(),
    ManagerController = require('../controllers/manager.controller');

    

    router
        .route('/data')
        .get(ManagerController.getManagerData)

    module.exports = router;
