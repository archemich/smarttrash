const e = require("express");
const TrashService = require("../services/trash.service")


module.exports = {
    getTrash: (req, res) => {
        if (req.query.id) {
            if(result = TrashService.getTrashs(id)){
                return res.status(200).json({trashs: result});
            }
            else return res.sendStatus(404);    //Мусорка по id не найдена.
        }
        else {
            if (result = TrashService.getTrashs()) {
            return res.status(200).json({trashs: result});
            }
            else {
                return res.sendStatus(404);     //Мусорки не найдены.
            }
        }
    },

    updateTrash: (req, res) => {
        if (!req.body.per || !req.body.id || !req.body.batt) {res.end();return;}
        console.log(req.body);
        TrashService.updateTrash(req.body.id, req.body.per, req.body.batt);
        res.end();
    }
}