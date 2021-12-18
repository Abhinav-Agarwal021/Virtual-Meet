const CategoryDto = require("../dtos/categoryDto");
const GrpService = require("../Services/GrpService");

class GrpController{
    async createCat(req, res) {
        const { roomId, name, role, members } = req.body;

        if (!name || !role || !members) {
            res.status(400).json({message:"All fields are required"})
        }

        const Cat = await GrpService.CreateCat({
            roomId,
            name,
            role,
            members
        })

        return res.json(new CategoryDto(Cat));
    }
}

module.exports = new GrpController();