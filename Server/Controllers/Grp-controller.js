const CategoryDto = require("../dtos/categoryDto");
const ChannelDto = require("../dtos/channelDto");
const rolesDto = require("../dtos/rolesDto");
const GrpService = require("../Services/GrpService");
const RoomService = require("../Services/RoomService");

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
        const { categoryId, name, type, roomId } = req.body;

        if (!categoryId || !name || !type) {
            res.status(400).json({ message: "Category id and channel name is req for a channel" })
        }

        const channel = await GrpService.createChannel({
            categoryId,
            name,
            roomId,
            type
        })

        return res.json(new ChannelDto(channel))
    }

    async getRoom(req, res) {
        const room = await GrpService.getRoom(req.params.roomId)
        const allCat = room.map((rooms) => new CategoryDto(rooms))

        return res.json(allCat)
    }

    async getChannels(req, res) {
        const channels = await GrpService.getChannels(req.params.roomId)
        const allChannels = channels.map((channel) => new ChannelDto(channel))

        return res.json(allChannels)
    }

    async generateInviteCode(req, res) {
        const { roomId } = req.body;

        const code = await GrpService.generateCode()

        const Invites = await GrpService.createCodes({
            roomId,
            code
        })

        return res.json(Invites);
    }

    async verifyInvitecode(req, res) {
        const { code, userId } = req.body;

        var exptime = 604800000;

        const data = await GrpService.getCodeInfo(code);

        if (Date.now() - Date.parse(data.createdAt) > exptime) {
            await GrpService.updateCodeInfo(code)
            res.status(400).json({
                message: "OTP expired!"
            })
        }

        const Id = data.roomId.toString();

        const room = await RoomService.updateRoomInfo({ Id, userId });

        return res.json(room)
    }
}

module.exports = new GrpController();