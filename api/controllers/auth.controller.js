const e = require('express');
const AuthService = require('../services/auth.service')
    , bcrypt = require('bcrypt')
    ;


module.exports = {
    async login(req, res) {
        
        let user = await AuthService.getUser(req.body.login);
        if (!user) {
            res.status(404).json({message: 'Пользователь не найден'});
            return;
        }
        
        var salt = bcrypt.genSaltSync(10);
        if (bcrypt.hashSync(req.body.password, salt) === user[[0][1]])
        {
            res.cookie('login', jwt.generateJWT({login: user[0][0].login}), {httpOnly: true});
            res.status(200).json({message: "Пользователь авторизован"});
        }
        else {
            res.status(401).json({message: "Неверный логин или пароль"});
        }
    }
}