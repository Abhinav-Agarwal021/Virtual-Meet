const roomDto = require("../dtos/roomDto");
const RoomService = require("../Services/RoomService");

class RoomsController {

    async create(req, res) {
        const { server } = req.body;

        if (!server) {
            return res.status(400).json({ message: "server name is required" });
        }

        const room = await RoomService.create({
            server,
            ownerId: req.user._id
        })

        res.json(new roomDto(room))
    }

    async getRooms(req, res) {

        try {

            const rooms = await RoomService.getRooms({ ownerId: req.params.userId })
            res.json(rooms)

        } catch (error) {
            res.status(400).json({ message: "db error" })
        }

    }

}

module.exports = new RoomsController();