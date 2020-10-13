const express = require('express')
    , router = express.Router()
    , TrashController = require('../controllers/trash.controllers');


router
    .route('/')
    .get(TrashController.getTrash)
    .post(TrashController.createTrash)
    .put(TrashController.updateTrash)
    .delete(TrashController.deleteTrash);


    module.exports = router;