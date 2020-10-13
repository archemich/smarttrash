const express = require('express'),
    router = express.Router();


router.get('/', (req,res) => {
    res.send(req.url);
})

module.exports = router;