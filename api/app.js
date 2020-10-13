const { Router } = require('express');

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    router = express.Router();

    const host = 'localhost';
    const port = 3000;

    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(require('cookie-parser')());
    

    app.use('/api', require('./routes/index'));
    app.use('/api/manager', require('./routes/manager.route'));
    app.use('/api/driver', require('./routes/driver.route'));
    app.use('/api/trash', require('./routes/trash.route'));


    app.use(function (req, res) {
        res.status(404).send("Not Found")
    });

    app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));

global.__projectdir = __dirname;
// global.__projectdir = process.env.PWD; 