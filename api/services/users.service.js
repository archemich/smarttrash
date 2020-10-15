const db = require("../config/db.js")
    , TrashService = require("./trash.service")

module.exports = {
    getTrashs: async (filter) => {
        TrashService.getTrashs(id = null, filter);
    },

    getDrivers: async () => {
        db.query('SELECT * FROM users WHERE login != \'manager\'').then(result => {
            console.log(result);
            return result;
        }).catch(err => {
            console.log(err);
            return false;
        })
    },

    getDriverPath: async () => {
        db.query('SELECT idtrash, lat, lng FROM trashs WHERE idtrash IN (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(users.way, \',\', numbers.n), \',\', -1) name FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers INNER JOIN users ON CHAR_LENGTH(users.way)-CHAR_LENGTH(REPLACE(users.way, \',\', \'\'))>=numbers.n-1 WHERE login = ? ORDER BY n)', [user])
        .then(result => {
            console.log(result);
            return result;
        }).catch(err => {
            console.log(err);
            return false;
        })
    }
}
