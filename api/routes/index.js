const router = require('express').Router();


router
    .route('/')
    .get((req,res) => {res.send(req.url);})

module.exports = router;