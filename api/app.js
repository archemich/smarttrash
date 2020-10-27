const express = require('express')
    , app = express() 
    ;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('cors')(require('./controllers/cors')))

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users.route'));
app.use('/trash', require('./routes/trash.route'));
app.use('/auth', require('./routes/auth.route'));

app.use((req, res) => {
    res.status(404).json({ error: { code: 404 } });
});

app.use((req, res, error) => {
    console.log(error);
    res.status(500).json({ error: { code: 500 } });
})

app.listen(process.env.PORT || 8080, () => console.log(`Listen on :`, process.env.PORT || 8080));
