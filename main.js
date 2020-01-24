const express = require('express')
	, app = express()
	, http = require('http').Server(app)
	, io = require('socket.io').listen(http)
	, md5 = require('js-md5')
	, jwt = require('./jwt')
;

let con = require('mysql2').createConnection({user: "trash", password: "trash", database: "trash", charset: "utf8mb4"});
con.on('error', (err) => {console.warn(err)});
con.connect((err) => {if (err) return console.error('error connecting: ' + err.stack); console.log('mysql for / as id ' + con.threadId);});
let util = require('mysql-utilities');
util.upgrade(con);
util.introspection(con);

app.use(express.static('public'));

try {require('./io')(io, con)} catch (e) {console.warn(e)}

function checkAccess(req, res, next) {
	if (!req.cookies.login) {res.redirect('/login');return;}
	if (!jwt.verifyJWT(req.cookies.login)) {res.clearCookie('login');res.redirect('/login');return;}
	next();
}

app.use(express.urlencoded({ extended: true })).use(express.json()).use(require('cookie-parser')());

app.get('/', (req, res) => {
	res.sendFile(process.env.PWD+'/views/index.html');
});

app.get('/map', (req, res) => {
	res.sendFile(process.env.PWD+'/views/map.html');
});

app.get('/login', (req, res) => {
	if (req.cookies.login && jwt.verifyJWT(req.cookies.login)) {
		res.redirect(['manager'].indexOf(jwt.decodeJWT(req.cookies.login).login) == -1 ? '/driver' : '/manager');
		return;
	}
	
	res.sendFile(process.env.PWD+'/views/login.html');
});

app.post('/login', async (req, res) => {
	if (req.body.action != 'OK') {res.redirect('/');return;}
	
	let user = await con.promise().query('SELECT * FROM users WHERE login = ? AND password = ?', [req.body.login, md5(req.body.password)]);
	if (!user[0].length) {res.send('Неправильный логин или пароль. <a href="/login">Назад</a>');return;}
	
	res.cookie('login', jwt.generateJWT({login: user[0][0].login}), {httpOnly: true});
	res.redirect(['manager'].indexOf(req.body.login) == -1 ? '/driver' : '/manager');
});

app.get('/driver', checkAccess, (req, res) => {
	if (['manager'].indexOf(req.body.login) != -1) {res.redirect('/manager'); return;}
	
	res.sendFile(process.env.PWD+'/views/driver.html');
});

app.get('/manager', checkAccess, (req, res) => {
	if (['manager'].indexOf(req.body.login) == -1) {res.redirect('/driver'); return;}
	
	res.sendFile(process.env.PWD+'/views/manager.html');
});

// Handle 404 AND 500
app.use((req, res) => res.status(404).send('404 Error <a href="/">Home page</a>'))
	.use((error, req, res) => {console.warn(error); res.status(500).send('500 Error <a href="/">Home page</a>');});

http.listen(8000, () => console.log('Work on port :8000'));