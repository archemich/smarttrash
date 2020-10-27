const TrashService = require("../services/trash.service");


module.exports = {
    async getTrash(req, res) {
        if (req.query.id) {
            result = await TrashService.getTrashs(id)
            if(result){
                return res.status(200).json({trashs: result});
            }
            else return res.status(422).json({error: {message: "Trash was not found"}});    //Мусорка по id не найдена.
        }
        else {
            if (result = await TrashService.getTrashs()) {
            return res.status(200).json({trashs: result});
            }
            else {
                return res.status(422).json({error: {message: "Trashes was not found"}});     //Мусорки не найдены.
            }
        }
    },

    async updateTrash(req, res) {
        if (!req.body.per || !req.body.id || !req.body.batt) {
            res.status(400).json({error: {message: "Can't update trash"}});
            return;
        }
        console.log(req.body);
        if (result = await TrashService.updateTrash(req.body.id, req.body.per, req.body.batt))
            return res.status(200).json(result);
    }
}