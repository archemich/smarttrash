const db = require('../config/db');

module.exports = {
    getTrashs: (id) => {
        if (id){
            db.query(`SELECT * FROM trashs where id = ${id}`).then(result => {
            console.log(result);
            return result;
        }).catch(err => {
            console.log(err);
            return false;
        });
        }
        else{ 
            db.query('SELECT * FROM trashs').then(result => {
                console.log(result);
                return result;
            }).catch(err => {
                console.log(err);
                return false;

            });
        }
    },

    updateTrash: (id, per, batt) => {
        db.query('UPDATE trashs SET forClean = if(percent > ?, 0, 1), percent = ?, battery = ? WHERE idtrash = ?', [per, per, batt, id])
        .then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err);
        }); 
    }
}