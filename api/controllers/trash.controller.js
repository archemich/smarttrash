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
    }
}