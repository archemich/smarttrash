const jwt = require('./utils/jwt.js');

module.exports = {

        checkAccess(req, res, next) {
        if (!req.cookies.login) {res.redirect('/login'); return;}
        if (!jwt.verifyJWT(req.cookies.login)) {res.clearCookie('login');res.redirect('/login');return;}
        
        let user = jwt.decodeJWT(req.cookies.login).login;
        if (['manager'].indexOf(user) == -1 && req.originalUrl == '/manager') {res.redirect('/driver'); return;}
        else if (['manager'].indexOf(user) != -1 && req.originalUrl == '/driver') {res.redirect('/manager'); return;}
        
        next();
        },
        
        clearCookie(req, res, cookie) {
            if (req.cookies.login) 
                res.clearCookie(cookie);
        },
};