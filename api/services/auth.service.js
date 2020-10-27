const db = require('./db');


module.exports = {
    async getUser(login) {
        result = await db.query(`SELECT * FROM users WHERE login = ${login}`)
        console.log(result);
        return result;
    }
}