const db = require("../config/db.js");

module.exports = {
    getTrashs: (filter) => {
        if (filter){
            db.query(`SELECT * FROM trashs ORDER BY ${filter}`).then(result => {
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

    getDrivers: () => {
        db.query('SELECT * FROM users WHERE login != \'manager\'').then(result => {
            console.log(result);
            return result;
        }).catch(err => {
            console.log(err);
        })

    }
}