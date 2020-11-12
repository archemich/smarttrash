const express = require('express'),
	app = express();

app
	.use(require('./controllers/cors'))
	.use(express.json())
	.use(express.urlencoded({ extended: true }))

	.use('/', require('./routes/index'))
	.use('/auth', require('./routes/auth'))
	.use('/users', require('./routes/users'))
	.use('/trashes', require('./routes/trashes'));

// Handle 404 AND 500
app
	.use((req, res) => res.status(404).json({ error: { type: 'NOT FOUND', code: 404 } }))
	.use((error, req, res) => {
		console.warn(error);
		res.status(500).json({ error: { type: 'INTERNAL SERVER ERROR', code: 500 } });
	});

app.listen(process.env.PORT || 8080, () => console.log(`Listen on :`, process.env.PORT || 8080));
