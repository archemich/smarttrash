const express = require('express')
    , router = express.Router()
    , TrashController = require('../controllers/trash.controller')
    ;


router
    .route('/')
    .get(TrashController.getTrash)
    .put(TrashController.updateTrash)


module.exports = router;