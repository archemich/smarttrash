const { Router } = require('express');

const express = require('express'),
    app = express(),
    router = express.Router();

    const host = 'localhost';
    const port = 3000;

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(require('cookie-parser')());
    

    app.use('/', require('./routes/index'));
    app.use('/users', require('./routes/users.route'));
    app.use('/trash', require('./routes/trash.route'));


    app.use(function (req, res) {
        res.status(404).send("Not Found")
    });

    app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));

