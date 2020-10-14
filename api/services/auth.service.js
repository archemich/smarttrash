const db = require('../config/db');


module.exports = {
    getUser: () => {
        db.query('SELECT * FROM users WHERE login = ? AND password = ?', [req.body.login, md5(req.body.password)])
        .then(result => {
           console.log(result);
           return result;
       })
       .catch (err => {
            console.log(err);
            return false;
       });
    }
}