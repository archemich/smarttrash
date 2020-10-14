const AuthService = require('../services/auth.service');


module.exports = {
    login: (req, res) => {
        
        let user = AuthService.getUser;
        if (!user) {
            res.status(404).json({message: 'Пользователь не найден'});
            return;
        }
        res.cookie('login', jwt.generateJWT({login: user[0][0].login}), {httpOnly: true});
        res.sendStatus(202);
    }
}