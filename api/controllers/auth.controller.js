const bcrypt = require('bcrypt')
    , AuthService = require('../services/auth.service');


module.exports = {
    login: (req, res) => {
        
        let user = await AuthService.getUser(req.body.login);
        if (!user) {
            res.status(404).json({message: 'Пользователь не найден'});
            return;
        }
        res.cookie('login', jwt.generateJWT({login: user[0][0].login}), {httpOnly: true});
        res.sendStatus(200);
    },

    
}