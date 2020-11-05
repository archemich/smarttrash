const db = require('./db');

module.exports = {
    async getUsers() {
        let result = await db.query('SELECT user_id, login, role FROM users;');
        result = result[0][0];
        console.log(result);
        return result;
    },

    async getTrashs(id, filter) {
        if (id) {
            let result = await db.query('SELECT * FROM trashs WHERE trash_id = ?;', [id]);
            result = result[0][0];
            console.log(result);
            return result;
        } else {
            if (filter) {
                let result = await db.query('SELECT * FROM trashs ORDER BY ?;', [filter]);
                result = result[0][0];
                console.log(result);
                return result;
            }
            else {
                let result = await db.query('SELECT * FROM trashs;');
                result = result[0][0];
                console.log(result);
                return result;
            }
        }
    },

    async updateTrash(id, per, batt) {
        let result = await db.query('UPDATE trashs SET percent = ?, battery = ? WHERE trash_id = ?;', [per, batt, id]);
        console.log(result)
        return result;
    },

    // async getDriverPath() {
    //     let result = await db.query('SELECT trash_id, lat, lng FROM trashs WHERE trash_id IN (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(users.way, \',\', numbers.n), \',\', -1) name FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers INNER JOIN users ON CHAR_LENGTH(users.way)-CHAR_LENGTH(REPLACE(users.way, \',\', \'\'))>=numbers.n-1 WHERE login = ? ORDER BY n)', [user])
    //     console.log(result);
    //     return result;
    // },

    async addWay(login, trash_id) {
        let result = await db.query('INSERT INTO users_trashs(user_id, trash_id) VALUES((SELECT user_id FROM users WHERE login = ?), ?;', [login, trash_id]);
        console.log(result);
        return result;
    },

    async delWay(trash_id) {
        let result = await db.query('DELETE FROM users_trashs WHERE trash_id = ?;', [trash_id])
        console.log(result);
        return result;
    },

    async getUsers(login, isDrivers) {
        let result;
        if(login) {
            result = await db.query('SELECT user_id, login, role FROM users WHERE login = ?;', [login]);
        }
        else if(isDrivers) {
            result = await db.query('SELECT user_id, login FROM users WHERE role=0;');
        }
        else {
            result = await db.query('SELECT user_id, login, role FROM users;');
        }
        result = result[0][0];
        console.log(result);
        return result;
    },

    async loadCSV(filePath, table) {
        if (!filePath) {
            return false;
        }
        if (table === "trashs") {
            let result = await db.query('LOAD DATA INFILE ? REPLACE INTO TABLE ? FIELDS TERMINATED BY \',\' ENCLOSED BY \'"\' LINES TERMINATED BY \'\n\' IGNORE 1 LINES;', [trash_id, lat, lang]);
            console.log(result);
            return result;
        }
        else if (table === "users") {
            let result = await db.query('LOAD DATA INFILE ? REPLACE INTO TABLE ? FIELDS TERMINATED BY \',\' ENCLOSED BY \'"\' LINES TERMINATED BY \'\n\' IGNORE 1 LINES;'(user_id, login, password, role));

        }
    }
}