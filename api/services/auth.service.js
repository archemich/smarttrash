const db = require('../config/db');


module.exports = {
    getUser: async (login) => {
        db.query(`SELECT * FROM users WHERE login = ${login}`)
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