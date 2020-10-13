const express = require('express')
	, app = express()
	, http = require('http').Server(app)
	, webapp = require('./webapp')
	, md5 = require('js-md5')
	, jwt = require('./jwt')
	, conf = require('./config/config')
	, auth = require('./auth')
	, jsonParser = express.json();
;

let con = require('mysql2').createConnection({user: conf.user, password: conf.password, database: conf.database, charset: "utf8mb4"});
con.on('error', (err) => {console.warn(err)});
con.connect((err) => {if (err) return console.error('error connecting: ' + err.stack); console.log('mysql for / as id ' + con.threadId);});
const { response } = require('express');
let util = require('mysql-utilities');
const { config } = require('process');
const webapp = require('./webapp');
util.upgrade(con);
util.introspection(con);
con.query(`SET SESSION wait_timeout = ${conf.wait_timeout}`);

app.use(express.urlencoded({ extended: true })).use(express.json()).use(require('cookie-parser')());

app.get('/', (req, res) => {
	res.sendFile(__projectdir + '/views/index.html');

});

app.get('/map', (req, res) => {
	res.sendFile(__projectdir + '/views/map.html');

});

app.get('/login', (req, res) => {
	if (req.cookies.login && jwt.verifyJWT(req.cookies.login)) {
		res.redirect(['manager'].indexOf(jwt.decodeJWT(req.cookies.login).login) == -1 ? '/driver' : '/manager');
		return;
	}
	
	res.sendFile(__projectdir + '/views/login.html');
	

});

app.post('/login', async (req, res) => {
	if (req.body.action != 'OK') {res.redirect('/');return;}
	
	let user = await con.promise().query('SELECT * FROM users WHERE login = ? AND password = ?', [req.body.login, md5(req.body.password)]);
	if (!user[0].length) {res.send('Неправильный логин или пароль. <a href="/login">Назад</a>');return;}
	
	res.cookie('login', jwt.generateJWT({login: user[0][0].login}), {httpOnly: true});
	res.redirect(['manager'].indexOf(req.body.login) == -1 ? '/driver' : '/manager');
});

app.get('/logout', (req, res) => {
	auth.clearCookie(req, res, cookie);
	res.redirect('/');
});

app.get('/driver', auth.checkAccess, (req, res) => {
	res.sendFile(__projectdir + '/views/driver.html');

});

app.get('/manager', auth.checkAccess, (req, res) => {
	res.sendFile(__projectdir + '/views/.managerhtml');
	
});

// app.get('/manager/data', jsonParser, (req, res) => {
// 	console.log(req.body);
// 	if (!req.body); return res.sendStatus(400);
// 	webapp.getManagerData(req.body.trash, req.body.driver, req.body.filter)
	
// });

app.post('/trash', (req, res) => {
	if (!req.body.per || !req.body.id || !req.body.batt) {res.end();return;}
	console.log(req.body);
	con.query('UPDATE trashs SET forClean = if(percent > ?, 0, 1), percent = ?, battery = ? WHERE idtrash = ?', [req.body.per, req.body.per, req.body.batt, req.body.id], () => {});
	res.end();
});

// Handle 404 AND 500
app.use((req, res) => res.status(404).send('404 Error <a href="/">Home page</a>'))
	.use((error, req, res) => {console.warn(error); res.status(500).send('500 Error <a href="/">Home page</a>');});

http.listen(8001, () => console.log('Work on port :8001'));