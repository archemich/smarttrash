"use strict"
const db = require('./db');

module.exports = {
    async getTrashs(id, filter) {
        if(id){
            let result = await db.query(`SELECT * FROM trashs WHERE id = ?`, [id]);
            console.log(result);
            return result;
        } else{ 
            if (filter) {
               let result = await db.query(`SELECT * FROM trashs ORDER BY ?`, [filter]);
                console.log(result);
                return result;
            }
            else {
                let result = db.query('SELECT * FROM trashs');
                console.log(result);
                return result;
            }
        }
    },

    async updateTrash(id, per, batt) {
        result = await db.query('UPDATE trashs SET forClean = if(percent > ?, 0, 1), percent = ?, battery = ? WHERE idtrash = ?', [per, per, batt, id])
        console.log(result)
        return result;
    },

    async getDrivers() {
        result = await db.query('SELECT * FROM users WHERE login != \'manager\'')
        
    },

    async getDriverPath() {
        result = await db.query('SELECT idtrash, lat, lng FROM trashs WHERE idtrash IN (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(users.way, \',\', numbers.n), \',\', -1) name FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers INNER JOIN users ON CHAR_LENGTH(users.way)-CHAR_LENGTH(REPLACE(users.way, \',\', \'\'))>=numbers.n-1 WHERE login = ? ORDER BY n)', [user])
        console.log(result);
        return result;
    },

    async addWay(login, way) {
        con.update('users', {login, way}, () => {}); 
        con.query('UPDATE trashs SET forClean = 1 WHERE idtrash IN (?)', [way.split(',')], () => {})
    },

    async delWay(login) {
        con.queryValue('SELECT way FROM users WHERE login = ?', [login], (err, way) => {con.query('UPDATE trashs SET forClean = 0 WHERE idtrash IN (?)', [way.split(',')], () => {})}); 
        con.update('users', {login, way: null}, () => {})
    },
    
    async getUser(login) {
        result = await db.query(`SELECT * FROM users WHERE login = ?}`, [login])
        console.log(result);
        return result;
    },
}