const express = require('express')
    , router = express.Router()
    , TrashController = require('../controllers/trash.controllers')
    ;


router
    .route('/')
    .get(TrashController.getTrash)
    .post(TrashController.updateTrash)


module.exports = router;