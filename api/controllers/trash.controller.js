const TrashService = require("../services/trash.service");


module.exports = {
    async getTrash(req, res) {
        if (req.query.id) {
            result = await TrashService.getTrashs(id)
            if(result){
                return res.status(200).json({trashs: result});
            }
            else return res.status(404).json({message: "Мусорка не найдена"});    //Мусорка по id не найдена.
        }
        else {
            if (result = await TrashService.getTrashs()) {
            return res.status(200).json({trashs: result});
            }
            else {
                return res.status(404).json({message: "Мусорки не найдены"});     //Мусорки не найдены.
            }
        }
    },

    async updateTrash(req, res) {
        if (!req.body.per || !req.body.id || !req.body.batt) {
            res.sendStatus(400);
            return;
        }
        console.log(req.body);
        if (result = await TrashService.updateTrash(req.body.id, req.body.per, req.body.batt))
            return res.status(200).json(result);
    }
}