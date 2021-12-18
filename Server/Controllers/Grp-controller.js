const CategoryDto = require("../dtos/categoryDto");
const ChannelDto = require("../dtos/channelDto");
const rolesDto = require("../dtos/rolesDto");
const GrpService = require("../Services/GrpService");

class GrpController {
    async createCat(req, res) {
        const { roomId, name, role } = req.body;

        if (!name || !role) {
            res.status(400).json({ message: "All fields are required" })
        }

        const Cat = await GrpService.CreateCat({
            roomId,
            name,
            role
        })

        return res.json(new CategoryDto(Cat));
    }

    async createRole(req, res) {
        const { roomId, userId, role } = req.body;

        if (!userId || !role) {
            res.status(400).json({ message: "UserId and roomId is required for a role" })
        }

        const user = await GrpService.createRole({
            roomId,
            userId,
            role
        })

        return res.json(new rolesDto(user))
    }

    async createChannel(req, res) {
        const { categoryId, name } = req.body;

        if (!categoryId || !name) {
            res.status(400).json({ message: "Category id and channel name is req for a channel" })
        }

        const channel = await GrpService.createChannel({
            categoryId,
            name
        })

        return res.json(new ChannelDto(channel))
    }
}

module.exports = new GrpController();