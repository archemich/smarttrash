const db = require('../config/db');

module.exports = {
    async getTrashs(id, filter) {
        if (id){
            db.query(`SELECT * FROM trashs WHERE id = ${id}`).then(result => {
            console.log(result);
            return result;
        }).catch(err => {
            console.log(err);
            return false;
        });
        }
        else{ 
            if (filter) {
                db.query(`SELECT * FROM trashs ORDER BY ${filter}`).then(result => {
                    console.log(result);
                    return result;
                }).catch(err => {
                    console.log(err);
                    return false;
                });
            }
            else {
                db.query('SELECT * FROM trashs').then(result => {
                    console.log(result);
                    return result;
                }).catch(err => {
                    console.log(err);
                    return false;

                });
            }
        }
    },

    async updateTrash(id, per, batt) {
        result = await db.query('UPDATE trashs SET forClean = if(percent > ?, 0, 1), percent = ?, battery = ? WHERE idtrash = ?', [per, per, batt, id])
        console.log(result)
        return result;
    }
}