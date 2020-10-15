const e = require("express");
const TrashService = require("../services/trash.service")


module.exports = {
    getTrash: async (req, res) => {
        if (req.query.id) {
            result = await TrashService.getTrashs(id)
            if(result){
                return res.status(200).json({trashs: result});
            }
            else return res.sendStatus(404);    //Мусорка по id не найдена.
        }
        else {
            if (result = await TrashService.getTrashs()) {
            return res.status(200).json({trashs: result});
            }
            else {
                return res.sendStatus(404);     //Мусорки не найдены.
            }
        }
    },

    updateTrash: async (req, res) => {
        if (!req.body.per || !req.body.id || !req.body.batt) {
            res.status(400).json({message: "No data recieved"});
            return;
        }
        console.log(req.body);
        if (result = await TrashService.updateTrash(req.body.id, req.body.per, req.body.batt))
            return res.status(200).json(result);
    }
}