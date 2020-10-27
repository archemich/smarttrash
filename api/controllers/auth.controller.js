const db = require('../services/db')
    , jwt = require('../utils/jwt')
    , bcrypt = require('bcrypt')
    , salt = 10
    ;


module.exports = {
    async login({ body }, res) {
        let user = await db.query(`SELECT * FROM users WHERE login = ?`, [body.login]);

        if (!user) {
            res.status(422).json({ error: { message: 'User not found' } });
            return;
        }

        if (!bcrypt.compareSync(body.password, user[0][1].password)) {
            res.status(401).json({message: "Неверный логин или пароль"});
            return;
        }

        res.json({ status: 'OK', token: jwt.generateJWT({login: user[0][0].login}) });
    },
    
    async register({ body: { password } }, res) {
        res.json({ crypt: bcrypt.hashSync(password, salt) });
    }
}